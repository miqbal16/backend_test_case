import express from 'express';

import {
  getAllMembers,
  getSingleMember,
} from '../controllers/member.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/members:
 *  get:
 *    summary: Get All Members
 *    tags:
 *      - Member
 *    description: Get all members from database
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: Array
 *              properties:
 *                _id:
 *                  type: string
 *                  description: id of member
 *                  example: 322ddtgddjj43f
 *                code:
 *                  type: string
 *                  description: code of member
 *                  example: M122
 *                name:
 *                  type: string
 *                  description: name of member
 *                  example: bob
 *                loanBookQuantity:
 *                  type: integer
 *                  description: loan book quantity of member
 *                  example: 1
 *                penaltyTime:
 *                  type: string
 *                  description: penalty time of member
 *                  example: '2022-11-22'
 *                createdAt:
 *                  type: string
 *                  description: member created
 *                  example: '2022-11-12'
 */
router.get('/', getAllMembers);

/**
 * @swagger
 * /api/members/{memberCode}:
 *  get:
 *    summary: Get Single Member
 *    tags:
 *      - Member
 *    description: Get single member with member code
 *    parameters:
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
 *                _id:
 *                  type: string
 *                  description: id of member
 *                  example: 322ddtgddjj43f
 *                code:
 *                  type: string
 *                  description: code of member
 *                  example: M122
 *                name:
 *                  type: string
 *                  description: name of member
 *                  example: bob
 *                loanBookQuantity:
 *                  type: integer
 *                  description: loan book quantity of member
 *                  example: 1
 *                penaltyTime:
 *                  type: string
 *                  description: penalty time of member
 *                  example: '2022-11-22'
 *                createdAt:
 *                  type: string
 *                  description: member created
 *                  example: '2022-11-12'
 */
router.get('/:memberCode', getSingleMember);

export default router;
