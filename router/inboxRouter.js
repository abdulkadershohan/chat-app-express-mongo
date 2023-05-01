const express = require('express');
const { getInbox } = require('../controllers/inboxController');

const router = express.Router();

router.get('/', getInbox);

module.exports = router;