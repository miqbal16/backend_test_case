import Member from '../models/Member.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc        Get All Member
// @route       GET /api/members
const getAllMembers = asyncHandler(async (req, res, next) => {
  const members = await Member.find().select('-__v').populate({
    path: 'loanBooks',
    select: 'code title author loanDeadline -borrowBy -_id',
  });

  res.status(200).json({
    status: 'success',
    count: members.length,
    data: members,
  });
});

// @desc        Get Single Member
// @route       GET /api/members/:memberCode
const getSingleMember = asyncHandler(async (req, res, next) => {
  const member = await Member.findOne({ code: req.params.memberCode })
    .select('-__v')
    .populate({
      path: 'loanBooks',
      select: 'code title author loanDeadline -borrowBy -_id',
    });

  if (!member)
    return next(
      new ErrorResponse(`Member not found at id ${req.params.memberCode}`, 404)
    );

  res.status(200).json({
    status: 'success',
    data: member,
  });
});

export { getAllMembers, getSingleMember };
