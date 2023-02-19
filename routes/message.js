const express = require('express');
const { addMessage, getMessages } = require("../http/controllers/messageController");
const { requireSignin, adminMiddleware } = require('../http/middlewares/authMiddleware');
const { validateAddMessageRequest, isRequestValidated } = require("../validators/validate")
const router = express.Router();


router.post('/message/create', validateAddMessageRequest, isRequestValidated, addMessage);
router.get('/message/getmessages', requireSignin, adminMiddleware, getMessages);



module.exports = router;