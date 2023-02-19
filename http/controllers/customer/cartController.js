const db = require("../../../db/connect")

function cartController() {
    return {
        index(req, res) {
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart
            return res.json({ totalQty: req.session.cart.totalQty, session: req.session })
        },
        update(req, res) {
            //for firts time creting cart and adding basic object structure 
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart
            //check if item doesnt exixt in cart
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = (cart.items[req.body._id].qty) + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }

            return res.json({ totalQty: req.session.cart.totalQty, session: req.session })
        },

        increase(req, res) {
            let cart = req.session.cart
            cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
            cart.totalQty = cart.totalQty + 1
            cart.totalPrice = cart.totalPrice + req.body.price
            return res.json({ totalQty: req.session.cart.totalQty, session: req.session })

        },

        decrease(req, res) {
            let cart = req.session.cart
            if (cart.items[req.body._id].qty == 1) {
                delete cart.items[req.body._id]
                cart.totalQty = cart.totalQty - 1
                cart.totalPrice = cart.totalPrice - req.body.price
                return res.json({ totalQty: req.session.cart.totalQty, session: req.session })
            }
            cart.items[req.body._id].qty = cart.items[req.body._id].qty - 1
            cart.totalQty = cart.totalQty - 1
            cart.totalPrice = cart.totalPrice - req.body.price
            return res.json({ totalQty: req.session.cart.totalQty, session: req.session })
        },

        remove(req, res) {
            let cart = req.session.cart
            cart.totalQty=cart.totalQty-cart.items[req.body._id].qty
            cart.totalPrice = cart.totalPrice - ((cart.items[req.body._id].qty)*(req.body.price))
            delete cart.items[req.body._id]
            return res.json({ totalQty: req.session.cart.totalQty, session: req.session })
        },
        deleteSession(req,res){
            delete req.session.cart;
            return res.json({message: "Deleted Session"})
        }
    }
}


module.exports = cartController