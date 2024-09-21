import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('users');
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


  ////////////////


  await db.close();
};
run().catch(console.error);