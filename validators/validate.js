const { check, validationResult } = require('express-validator');
const fs = require("fs");
const path = require("path")

exports.validateSignUpRequest = [
    check('name').notEmpty().withMessage('Name**Name is required'),
    check('name').isLength({ min: 2 }).withMessage('Name**Name must be atleast 2 character long'),

    check('email').notEmpty().withMessage('Email**Email is required'),
    check('email').isEmail().withMessage('Email**Valid Email is required'),

    check('phone').notEmpty().withMessage('Phone**Phone number is required'),
    check('phone').isNumeric().withMessage('Phone**Valid Phone number is required'),
    check('phone').isLength({ min: 10 }).withMessage('Phone**Phone Number must be atleast 10 character long'),
    check('phone').isLength({ max: 10 }).withMessage('Phone**Phone Number must be atmost 10 character long'),

    check('password').notEmpty().withMessage('Password**Password is Required'),
    check('password').isLength({ min: 6 }).withMessage('Password**Password must be atleast 6 character long'),

    // check("cpassowrd").re
    check('cpassword').notEmpty().withMessage('Confirm Password**Confirm Password is Required'),
    check('cpassword').isLength({ min: 6 }).withMessage('Confirm Password**Confirm Password must be atleast 6 character long')
];

exports.validateSignInRequest = [
    check('email').notEmpty().withMessage('Email**Email is required'),
    check('email').isEmail().withMessage('Email**Enter a valid Email'),
    check('password').notEmpty().withMessage('Password**Password is Required'),
];


exports.validatePlaceOrderRequest = [
    check('phone').notEmpty().withMessage('Phone**Phone number is required'),
    check('phone').isNumeric().withMessage('Phone**Valid Phone number is required'),
    check('phone').isLength({ min: 10 }).withMessage('Phone**Phone Number must be atleast 10 character long'),
    check('phone').isLength({ max: 10 }).withMessage('Phone**Phone Number must be atmost 10 character long'),
    check('address').notEmpty().withMessage('Address**Address is required'),
];
exports.validateAddCategoryRequest = [
    check('name').notEmpty().withMessage('Name**Name is required'),
];
exports.validateAddProductRequest = [
    check('name').notEmpty().withMessage('Name**Name is required'),
    check('name').isLength({ min: 4 }).withMessage('Name**Name must be atleast 4 character long'),
    check('price').notEmpty().withMessage('Price**Price is required'),
    check('description').notEmpty().withMessage('Description**Description is required'),
    check('category').notEmpty().withMessage('Category**Category is required'),
];

exports.validateUpdateProductRequest = [
    check('name').notEmpty().withMessage('Name**Name is required'),
    check('name').isLength({ min: 4 }).withMessage('Name**Name must be atleast 4 character long'),
    check('price').notEmpty().withMessage('Price**Price is required'),
    check('description').notEmpty().withMessage('Description**Description is required'),
    check('category').notEmpty().withMessage('Category**Category is required'),
];

exports.validateAddMessageRequest = [
    check('name').notEmpty().withMessage('Name**Name is required'),
    check('name').isLength({ min: 4 }).withMessage('Name**Name must be atleast 4 character long'),
    check('email').notEmpty().withMessage('Email**Email is required'),
    check('email').isEmail().withMessage('Email**Valid Email is required'),
    check('message').notEmpty().withMessage('Message**Message is required'),
];


exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        if (req.file) {
            fs.unlink(path.join(req.file.destination, req.file.filename), (err) => { err ? console.log("Error while removing file", err) : "" })
        }
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
}