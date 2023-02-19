const db = require("../../../db/connect")
const Order = require("../../../models/order")
function orderController() {
    return {
        async allOrders(req, res) {
            Order.find({},null,{sort:{"createdAt":-1}}).exec((error, orders) => {
                if (error) return res.status(400).json({ error })
        
                if (orders) {
                    return res.status(200).json({ orders })
                }
            });
        },
        async updateOrder(req,res){
            const {id,status}=req.params;
            Order.findOneAndUpdate({_id:id},{$set:{status:status}}).exec((error, order) => {
                if (error) return res.status(400).json({ error })
        
                if (order) {  

                    //emit an event whenever the order status get updated using eventEmitter
                    // *************************
                    const eventEmitter=req.app.get("eventEmitter")        //this req.app was binded in the app.js server file
                    eventEmitter.emit("orderUpdated",order.user)         // emit an event of type "orderUpdated"

                    return res.status(200).json({ order })
                }
            });
        }
    }
}


module.exports = orderController