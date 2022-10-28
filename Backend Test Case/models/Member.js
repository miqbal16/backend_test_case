import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    loanBookQuantity: {
      type: Number,
      default: 0,
    },
    penaltyTime: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
  },
  {
    toObject: { virtuals: true },
  }
);

memberSchema.virtual('loanBooks', {
  ref: 'Book',
  localField: 'code',
  foreignField: 'borrowBy',
  justOne: false,
});

export default mongoose.model('Member', memberSchema);
