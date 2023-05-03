const express = require('express');
const { getUsers, addUser } = require('../controllers/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUploads = require('../middlewares/users/avatarUploads');
const { addUserValidators, addUserValidationHandler } = require('../middlewares/users/usersValidator');


const router = express.Router();

// login page
router.get('/', decorateHtmlResponse("Users"), getUsers);

//add user page
router.get('/', avatarUploads, addUserValidators, addUserValidationHandler, addUser);

module.exports = router;