const db = require("../../../db/connect")
const Order = require("../../../models/order")
function orderController() {
    return {
        async addOrder(req, res) {

            const { user, items, phone, address } = req.body;
            if (!user || !phone || !address) {
                return res.status(400).json({ error: "plz fill fields properly" })
            }
            const order = new Order({
                user,
                items,
                phone,
                address
            })
            await order.save((error, order) => {
                if (error) return res.status(400).json({ order })
                if (order) {
                    return res.status(201).json({ order })
                }
            });
        },

        async ordersById(req, res) {
            Order.find({user:req.params.id},null,{sort:{"createdAt":-1}}).exec((error, orders) => {
                if (error) return res.status(400).json({ error })
        
                if (orders) {
                    return res.status(200).json({ orders })
                }
            });
        },
    }
}


module.exports = orderController