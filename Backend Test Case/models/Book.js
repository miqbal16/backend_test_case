import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  title: String,
  author: String,
  stock: Number,
  borrowBy: {
    type: String,
    default: null,
  },
  loanDeadline: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Book', bookSchema);
