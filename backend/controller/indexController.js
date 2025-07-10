const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const {sendToken} = require('../utils/sendToken');
const ErrorHandler = require('../utils/ErrorHandler');
const { catchAsyncErrors } = require('../middleware/catchAsyncError');

// Register a new user
exports.register = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorHandler('Please provide username and password', 400));
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return next(new ErrorHandler('Username already exists', 400));
  }
  const user = await User.create({ username, password });
  sendToken(user, 201, res);
});

// Login user
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorHandler('Please provide username and password', 400));
  }
  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid credentials', 401));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler('Invalid credentials', 401));
  }
  sendToken(user, 200, res);
});
