const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { getGroups, joinGroup, myGroups, createGroup, getGroupMembers } = require('../controller/groupController');
const router = express.Router();

router.post('/', isAuthenticated, createGroup);
router.get('/', isAuthenticated, getGroups);
router.post('/join/:id', isAuthenticated, joinGroup);
router.get('/my', isAuthenticated, myGroups);

// Get members of a group
router.get('/:id/members', isAuthenticated, getGroupMembers);

module.exports = router;
