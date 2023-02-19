const Category = require("../../../models/category");
const Product = require("../../../models/product");
const Order = require("../../../models/order");
const Message =require("../../../models/message")


exports.initialData = async (req, res) => {

    const categories = await Category.find({});

    const queries =await Message.find({});

    // const orders=await Order.find({},null,{sort:{"createdAt":-1}});
    const orders = await Order.find({})
        .select("_id user items phone status address paymentType createdAt updatedAt")
        .populate({ path: "user", select: "_id name" })
        .exec();

    const products = await Product.find({})
        .select("_id name price slug description productPicture category createdAt updatedAt")
        .populate({ path: "category", select: "_id name" }) // it is used to get the data of the category also whose initially id was known (foreign key concept)
        .exec();

    res.status(200).json({
        categories,
        products,
        orders,
        queries
    })




}