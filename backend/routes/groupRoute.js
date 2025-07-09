const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { getGroups, joinGroup, myGroups } = require('../controller/groupController');
const router = express.Router();

router.get('/', isAuthenticated, getGroups);
router.post('/join/:id', isAuthenticated, joinGroup);
router.get('/my', isAuthenticated, myGroups);

module.exports = router;
