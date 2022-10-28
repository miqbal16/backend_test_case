import Book from '../models/Book.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import Member from '../models/Member.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc            Get all books
// @route           GET /api/books
const getAllBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find();

  res.status(200).json({
    status: 'success',
    count: books.length,
    data: books,
  });
});

// @desc            Get One book
// @route           GET /api/books/:bookCode
const getOneBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findOne({ code: req.params.bookCode });

  if (!book)
    return next(
      new ErrorResponse(`Book with code ${req.params.bookCode} not found`, 404)
    );

  res.status(200).json({
    status: 'success',
    data: book,
  });
});

// @desc            Get Available Books
// @route           GET /api/books/available
const getAvailableBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find({ borrowBy: null }).select('-_id -__v');

  res.status(200).json({
    status: 'success',
    quantities: books.length,
    data: books,
  });
});

// @desc            Borrow The Book
// @route           PUT /api/books/:bookCode/borrow/member/:memberCode
const borrowBook = asyncHandler(async (req, res, next) => {
  const dateNow = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const book = await Book.findOne({ code: req.params.bookCode });

  const member = await Member.findOne({ code: req.params.memberCode });

  // Check if the book code is correct
  if (!book)
    return next(
      new ErrorResponse(`Book not found at id ${req.params.bookCode}`, 404)
    );

  // Check if the member code is correct
  if (!member)
    return next(
      new ErrorResponse(`Member not found at id ${req.params.memberCode}`, 404)
    );

  // Check if the book has been borrowed
  if (book.borrowBy)
    return next(
      new ErrorResponse(`The book has been borrowed by someone`, 403)
    );

  // Check members where there is a penalty
  if (dateNow < member.penaltyTime)
    return next(
      new ErrorResponse(`Member ${member.code} in penalty period`, 403)
    );

  // Check if the member has borrowed two books
  if (member.loanBookQuantity >= 2)
    return next(
      new ErrorResponse(`Member ${member.code} have borrowed two books`, 403)
    );

  await Member.findOneAndUpdate(
    { code: member.code },
    {
      loanBookQuantity: member.loanBookQuantity + 1,
      penaltyTime: null,
    }
  );

  await Book.findOneAndUpdate(
    { code: book.code },
    {
      stock: book.stock - 1,
      borrowBy: member.code,
      loanDeadline: new Date(
        Date.now() - process.env.EXPIRE_BOOK_BORROW * 24 * 60 * 60 * 1000
      ),
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'The book has been successfully borrowed',
  });
});

// @desc            Return The Book
// @route           PUT /api/books/:bookCode/return/member/:memberCode
const returnBook = asyncHandler(async (req, res, next) => {
  let note = '';

  const dateNow = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const book = await Book.findOne({ code: req.params.bookCode });

  let member = await Member.findOne({ code: req.params.memberCode });

  // Check if the book code is correct
  if (!book)
    return next(
      new ErrorResponse(`Book not found at code ${req.params.bookCode}`, 404)
    );

  // Check if the member code is correct
  if (!member)
    return next(
      new ErrorResponse(
        `Member not found at code ${req.params.memberCode}`,
        404
      )
    );

  // Check if the book returned is really the book you borrowed
  if (book.borrowBy !== member.code)
    return next(
      new ErrorResponse(
        `Members ${member.code} do not borrow books with code ${book.code}`,
        400
      )
    );

  // Update data book and member
  const updateBook = {
    borrowBy: null,
    stock: book.stock + 1,
    loanDeadline: null,
  };

  const updateMember = { loanBookQuantity: member.loanBookQuantity - 1 };

  // Check whether members are late returning the book and haven't get a penalty
  if (dateNow > book.loanDeadline && !member.penaltyTime) {
    updateMember.penaltyTime = new Date(
      Date.now() + process.env.EXPIRE_PENALTY * 24 * 60 * 60 * 1000
    );
  }

  await Book.findOneAndUpdate({ code: book.code }, updateBook);

  member = await Member.findOneAndUpdate({ code: member.code }, updateMember, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    note: member.penaltyTime ? 'You are in penalty period' : '',
    message: 'Book returned successfully',
  });
});

export { getAllBooks, getOneBook, getAvailableBooks, borrowBook, returnBook };
