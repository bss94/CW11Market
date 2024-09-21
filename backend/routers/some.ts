import express from 'express';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from "../middlware/auth";
import {imagesUpload} from "../multer";

const someRouter = express.Router();
someRouter.get('/', async (req, res, next) => {
    try {
        // const posts = await Post.find().populate('author', 'username').sort({date: -1});
        // const comments = await Comment.find();
        // const postsWithCommentsCount = posts.map(el => {
        //     const commentCount = comments.filter((item) => item.post.toString() == el._id.toString()).length;
        //     return {
        //         _id: el._id,
        //         author: el.author,
        //         title: el.title,
        //         image: el.image,
        //         date: el.date,
        //         comments: commentCount
        //     };
        //
        // });
        // return res.send(postsWithCommentsCount);
    } catch (error) {
        next(error);
    }
});

someRouter.get('/:id', async (req, res, next) => {
    try {
        // const post = await Post.findById(req.params.id).populate('author', 'username').sort({date: -1});
        // if (post === null) {
        //     return res.status(404).send({error: 'Post not found'});
        // }
        // const comments = await Comment.find({post: req.params.id}).populate('author', 'username').sort({date: -1});
        // return res.send({post: post, comments: comments});
    } catch (error) {
        next(error);
    }
});

someRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send({error: 'Unauthorized'});
        }
        // const post = new Post({
        //     title: req.body.title,
        //     author: req.user._id,
        //     description: req.body.description,
        //     image: req.file ? req.file.filename : null,
        //     date: new Date(),
        // });
        // await post.save();
        // return res.send(post);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

export default someRouter;