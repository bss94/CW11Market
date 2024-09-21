import express from 'express';
import Product from '../models/Product';
import auth, {RequestWithUser} from '../middlware/auth';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';

const productsRouter = express.Router();
productsRouter.get('/', async (req, res, next) => {
  try {
    const category = req.query.category;
    const products = await Product.find(category ? {category: category} : {}).populate('category', 'title');
    return res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate('category', 'title').populate('author', ['name', 'phone']);
    if (!product) {
      return res.status(404).send({error: 'Product not found'});
    }
    return res.send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'Unauthorized'});
    }
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({error: 'Product not found'});
    }
    if (product.author.toString() !== req.user.id) {
      return res.status(401).send({error: 'Unauthorized'});
    }
    await product.deleteOne();
    return res.send({success: true});
  } catch (error) {
    next(error);
  }
});

productsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'Unauthorized'});
    }
    const product = new Product({
      author: req.user._id,
      category: req.body.category,
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      price: parseFloat(req.body.price),
      image: req.file ? req.file.filename : undefined,
    });
    await product.save();
    return res.send(product);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default productsRouter;