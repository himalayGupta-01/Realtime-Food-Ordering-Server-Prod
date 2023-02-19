const express=require('express');
const { addItemToCart } = require('../http/controllers/cartController');
const { requireSignin, userMiddleware } = require('../http/middlewares/authMiddleware');
const router = express.Router();

router.post('/user/cart/addtocart',requireSignin,userMiddleware,addItemToCart);

module.exports=router;