const { check, validationResult } = require('express-validator');
const User = require('../../models/People');
const createError = require('http-errors');
const fs = require('fs');

// add user

const addUserValidators = [
    check('name').isLength({ min: 1 }).withMessage('Name is required').isAlpha('en-US', { ignore: ' -' }).withMessage('Name must not contain anything other than alphabet').trim(),
    check('email').isEmail().withMessage('Invalid email address').trim().custom(async (value) => {
        try {
            const user = await User.findOne({ email: value });
            if (user) {
                throw createError('Email already in use');
            }
        }
        catch (err) {
            throw createError(err);
        }
    }),
    check('mobile').isMobilePhone('bn-BD',
        {
            strictMode: true // mobile number must be start with `+88`
        }).withMessage('Mobile number must be a valid Bangladeshi mobile number').custom(async (value) => {
            try {
                const user = await User.findOne({ mobile: value });
                if (user) {
                    throw createError('Mobile number already in use');
                }
            }
            catch (err) {
                throw createError(err);
            }
        }),
    check('password').isStrongPassword().withMessage('Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol')


]

const addUserValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    }
    else {
        // remove uploaded files
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            fs.unlink(`${appRoot}/public/uploads/avatars/${filename}`, (err) => {
                if (err) console.log(err);
            })
        }
    }
    // response the errors
    res.status(500).json({
        errors: mappedErrors
    })

}

module.exports = {
    addUserValidators,
    addUserValidationHandler
}