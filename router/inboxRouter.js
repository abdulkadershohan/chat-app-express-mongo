const express = require('express');
const { getInbox } = require('../controllers/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const router = express.Router();

router.get('/', decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;