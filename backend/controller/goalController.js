const Goal = require('../models/goalModel');
const ErrorHandler = require('../utils/ErrorHandler');
const { catchAsyncErrors } = require('../middleware/catchAsyncError');

// Add a new goal
exports.addGoal = catchAsyncErrors(async (req, res) => {
  const { title, progress, deadline } = req.body;
  const goal = await Goal.create({
    title,
    progress: progress || 0,
    deadline,
    user: req.user._id,
  });
  res.status(201).json({ success: true, goal });
});

// List all user's goals
exports.getGoals = catchAsyncErrors(async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });
  res.json({ success: true, goals });
});

// Update a goal
exports.updateGoal = catchAsyncErrors(async (req, res, next) => {
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
  if (!goal) return next(new ErrorHandler('Goal not found', 404));
  const { progress, deadline } = req.body;
  if (progress !== undefined) goal.progress = progress;
  if (deadline) goal.deadline = deadline;
  await goal.save();
  res.json({ success: true, goal });
}); 