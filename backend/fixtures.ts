import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Category from './models/Category';
import Product from './models/Product';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('products');
  } catch (err) {
    console.log('skipping drop');
  }
  const firstUser = new User({
    username: 'user',
    password: 'user',
    name: 'Morty Smith',
    phone: '+996555123456'
  });
  firstUser.generateToken();
  await firstUser.save();
  const secondUser = new User({
    username: 'admin',
    password: 'admin',
    name: 'Rick Sanchez',
    phone: '+996777123456'
  });
  secondUser.generateToken();
  await secondUser.save();
  const thirdUser = new User({
    username: 'test',
    password: 'test',
    name: 'Marty McFly',
    phone: '+996666123456'
  });
  thirdUser.generateToken();
  await thirdUser.save();

  const [vehicle, technique, food, drink] = await Category.create(
    {
      title: 'Vehicles'
    }, {
      title: 'Techniques',
    }, {
      title: 'Foods'
    }, {
      title: 'Drinks'
    });

  await Product.create(
    {
      author: firstUser,
      category: drink,
      title: 'Alien coffee',
      description: 'Morty Smith favorite drink for sale on Earth',
      price: 500,
      image: 'fixtures/image-not-found.png'
    },
    {
      author: firstUser,
      category: food,
      title: 'Alien burger',
      description: 'Morty Smith favorite food for sale on Earth',
      price: 200,
      image: 'fixtures/image-not-found.png'
    },
    {
      author: firstUser,
      category: technique,
      title: 'Myth Dragon',
      description: 'Morty Smith dreams dragon, but haves small defect',
      price: 1,
      image: 'fixtures/image-not-found.png'
    },
    {
      author: secondUser,
      category: technique,
      title: 'Portal Gun',
      description: 'Unique portal gun, can open portal everywhere',
      price: 9999999,
      image: 'fixtures/image-not-found.png'
    },
    {
      author: secondUser,
      category: technique,
      title: 'Plumbus',
      description: 'Just plumbus,I dont know for what, but I know i need it!',
      price: 10000,
      image: 'fixtures/image-not-found.png'
    },
    {
      author: secondUser,
      category: technique,
      title: 'Anti material gun',
      description: 'Can kill all subject, need to every better killer',
      price: 1000000,
      image: 'fixtures/image-not-found.png'
    },
    {
      author: thirdUser,
      category: vehicle,
      title: 'DeLorean with time machine',
      description: 'Unique car, can delivery You to any time, if cant then it just unique car',
      price: 1000000,
      image: 'fixtures/image-not-found.png'
    },
    {
      author: thirdUser,
      category: food,
      title: 'burger from 80s',
      description: 'Best taste of 1980',
      price: 10000,
      image: 'fixtures/image-not-found.png'
    },
    {
      author: thirdUser,
      category: drink,
      title: 'Very old Cola',
      description: 'Very very old Cola from far far away',
      price: 1000,
      image: 'fixtures/image-not-found.png'
    },
  );

  await db.close();
};

run().catch(console.error);