import fs from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';

dotenv.config({ path: './config.env' });

// Import models
import Book from './models/Book.js';
import Member from './models/Member.js';

// Import files
const books = JSON.parse(fs.readFileSync('./_data/books.json', 'utf-8'));
const members = JSON.parse(fs.readFileSync('./_data/members.json', 'utf-8'));

// Database
const DB = process.env.MONGO_URI.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err.message.red);
    process.exit(1);
  });

const importData = async () => {
  try {
    await Book.create(books);
    await Member.create(members);
    console.log('Import Data...'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err.stack.red);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Book.deleteMany();
    await Member.deleteMany();
    console.log('Destroy Data...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err.stack.red);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
