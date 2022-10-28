import express from 'express';

import {
  getAllBooks,
  getAvailableBooks,
  borrowBook,
  returnBook,
  getOneBook,
} from '../controllers/book.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *  get:
 *    summary: Get All Books
 *    tags:
 *      - Book
 *    description: Get all books from database
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: Array
 *              properties:
 *              - _id:
 *                  type: string
 *                  description: id of book
 *                  example: 322ddtgddjj43f
 *                code:
 *                  type: string
 *                  description: code of book
 *                  example: M122
 *                title:
 *                  type: string
 *                  description: title of book
 *                  example: cinderella
 *                author:
 *                  type: string
 *                  description: author of book
 *                  example: john
 *                stock:
 *                  type: integer
 *                  description: stock of book
 *                  example: '1'
 *                borrowBy:
 *                  type: string
 *                  description: user borrow book
 *                  example: 'M111'
 *                loanDeadline:
 *                  type: string
 *                  description: deadline borrow book
 *                  example: '2022-11-12'
 *                createdAt:
 *                  type: string
 *                  description: book created
 *                  example: '2022-11-12'
 */
router.get('/', getAllBooks);

/**
 * @swagger
 * /api/books/available:
 *  get:
 *    summary: Get All Books Available
 *    tags:
 *      - Book
 *    description: Get books Available
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: Array
 *              properties:
 *              - _id:
 *                  type: string
 *                  description: id of book
 *                  example: 322ddtgddjj43f
 *                code:
 *                  type: string
 *                  description: code of book
 *                  example: M122
 *                title:
 *                  type: string
 *                  description: title of book
 *                  example: cinderella
 *                author:
 *                  type: string
 *                  description: author of book
 *                  example: john
 *                stock:
 *                  type: integer
 *                  description: stock of book
 *                  example: '1'
 *                borrowBy:
 *                  type: string
 *                  description: user borrow book
 *                  example: 'M111'
 *                loanDeadline:
 *                  type: string
 *                  description: deadline borrow book
 *                  example: '2022-11-12'
 *                createdAt:
 *                  type: string
 *                  description: book created
 *                  example: '2022-11-12'
 */
router.get('/available', getAvailableBooks);

/**
 * @swagger
 * /api/books/{bookCode}:
 *  get:
 *    summary: Get Single Book
 *    tags:
 *      - Book
 *    description: Get single book with book code
 *    parameters:
 *      - in: path
 *        name: bookCode
 *        description: code the book
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *              - _id:
 *                  type: string
 *                  description: id of book
 *                  example: 322ddtgddjj43f
 *                code:
 *                  type: string
 *                  description: code of book
 *                  example: M122
 *                title:
 *                  type: string
 *                  description: title of book
 *                  example: cinderella
 *                author:
 *                  type: string
 *                  description: author of book
 *                  example: john
 *                stock:
 *                  type: integer
 *                  description: stock of book
 *                  example: '1'
 *                borrowBy:
 *                  type: string
 *                  description: user borrow book
 *                  example: 'M111'
 *                loanDeadline:
 *                  type: string
 *                  description: deadline borrow book
 *                  example: '2022-11-12'
 *                createdAt:
 *                  type: string
 *                  description: book created
 *                  example: '2022-11-12'
 */
router.get('/:bookCode', getOneBook);

/**
 * @swagger
 * /api/books/{bookCode}/borrow/member/{memberCode}:
 *  put:
 *    summary: Borrow Book
 *    tags:
 *      - Book
 *    description: Borrowing a book
 *    parameters:
 *      - in: path
 *        name: bookCode
 *        description: code the book
 *      - in: path
 *        name: memberCode
 *        description: code the member
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *              - _id:
 *                  type: string
 *                  description: id of book
 *                  example: 322ddtgddjj43f
 *                code:
 *                  type: string
 *                  description: code of book
 *                  example: M122
 *                title:
 *                  type: string
 *                  description: title of book
 *                  example: cinderella
 *                author:
 *                  type: string
 *                  description: author of book
 *                  example: john
 *                stock:
 *                  type: integer
 *                  description: stock of book
 *                  example: '1'
 *                borrowBy:
 *                  type: string
 *                  description: user borrow book
 *                  example: 'M111'
 *                loanDeadline:
 *                  type: string
 *                  description: deadline borrow book
 *                  example: '2022-11-12'
 *                createdAt:
 *                  type: string
 *                  description: book created
 *                  example: '2022-11-12'
 */
router.put('/:bookCode/borrow/member/:memberCode', borrowBook);

/**
 * @swagger
 * /api/books/{bookCode}/return/member/{memberCode}:
 *  put:
 *    summary: Return Book
 *    tags:
 *      - Book
 *    description: Returning a book
 *    parameters:
 *      - in: path
 *        name: bookCode
 *        description: code the book
 *      - in: path
 *        name: memberCode
 *        description: code the member
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *              - _id:
 *                  type: string
 *                  description: id of book
 *                  example: 322ddtgddjj43f
 *                code:
 *                  type: string
 *                  description: code of book
 *                  example: M122
 *                title:
 *                  type: string
 *                  description: title of book
 *                  example: cinderella
 *                author:
 *                  type: string
 *                  description: author of book
 *                  example: john
 *                stock:
 *                  type: integer
 *                  description: stock of book
 *                  example: '1'
 *                borrowBy:
 *                  type: string
 *                  description: user borrow book
 *                  example: 'M111'
 *                loanDeadline:
 *                  type: string
 *                  description: deadline borrow book
 *                  example: '2022-11-12'
 *                createdAt:
 *                  type: string
 *                  description: book created
 *                  example: '2022-11-12'
 */
router.put('/:bookCode/return/member/:memberCode', returnBook);

export default router;
