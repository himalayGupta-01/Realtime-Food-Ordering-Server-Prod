const Message = require("../../models/message")

exports.addMessage = (req, res) => {

    const messageObj = {
        name: req.body.name,
        email: req.body.email,
        message:req.body.message
    }

    const msg = new Message(messageObj);
    msg.save((error, message) => {
        if (error) return res.status(400).json({ error })
        if (message) {
            return res.status(201).json({message:"Message Sent successfully"})
        }
    });

}

exports.getMessages = (req, res) => {
    Message.find({}).exec((error, messages) => {
        if (error) return res.status(400).json({ error })

        if (messages) {
            return res.status(200).json({ messages })
        }
    });

}


