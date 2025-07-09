const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { addGoal, getGoals, updateGoal } = require('../controller/goalController');
const router = express.Router();

router.post('/', isAuthenticated, addGoal);
router.get('/', isAuthenticated, getGoals);
router.patch('/:id', isAuthenticated, updateGoal);

module.exports = router;
