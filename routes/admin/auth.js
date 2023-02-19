const express=require('express');
const router = express.Router();


const authController = require('../../http/controllers/admin/authController');
const { requireSignin } = require('../../http/middlewares/authMiddleware');
const { validateSignUpRequest, validateSignInRequest, isRequestValidated } = require('../../validators/validate');


// setting paths

//user registration route
router.post('/admin/signup',validateSignUpRequest,isRequestValidated,authController().signup)

// user login route
router.post('/admin/signin',validateSignInRequest,isRequestValidated,authController().signin)

// user logout route
router.post('/admin/signout',authController().signout)

 
module.exports=router;