const express = require('express');
const { addCategory, getCategories, deleteCategory, updateCategory } = require('../http/controllers/categoryController');
const { requireSignin, adminMiddleware } = require('../http/middlewares/authMiddleware');
const { validateAddCategoryRequest, isRequestValidated } = require('../validators/validate');
const router = express.Router();


router.post('/category/create', requireSignin, adminMiddleware,validateAddCategoryRequest,isRequestValidated, addCategory);
router.get('/category/getcategory', getCategories);
router.post("/category/delete/:id", requireSignin, adminMiddleware, deleteCategory);
router.post("/category/update/:id", requireSignin, adminMiddleware, updateCategory);



module.exports = router;