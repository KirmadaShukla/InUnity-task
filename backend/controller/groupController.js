const Group = require('../models/groupModel');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const { catchAsyncErrors } = require('../middleware/catchAsyncError');

// Create a new group
exports.createGroup = catchAsyncErrors(async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: 'Group name is required' });
  }
  const group = await Group.create({ name, description });
  res.status(201).json({
    success: true,
    message: 'Group created successfully',
    group
  });
});

// List all groups
exports.getGroups = catchAsyncErrors(async (req, res) => {
  const groups = await Group.find();
  res.json({ success: true, groups });
});

// Join a group
exports.joinGroup = catchAsyncErrors(async (req, res, next) => {
  const group = await Group.findById(req.params.id);
  if (!group) return next(new ErrorHandler('Group not found', 404));
  if (req.user.groups.includes(group._id)) {
    return next(new ErrorHandler('Already joined', 400));
  }
  req.user.groups.push(group._id);
  await req.user.save();
  res.json({ success: true, message: 'Joined group' });
});

// List groups the user has joined
exports.myGroups = catchAsyncErrors(async (req, res) => {
  await req.user.populate('groups');
  res.json({ success: true, groups: req.user.groups });
});

// Get members of a group
exports.getGroupMembers = catchAsyncErrors(async (req, res) => {
  const groupId = req.params.id;
  const users = await User.find({ groups: groupId }, '_id username');
  res.json({ success: true, members: users });
});
