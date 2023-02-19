const mongoose=require('mongoose');
const orderSchema= new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', 
        required:true
    },
    items:{
        type:Object,
        required:true
    },
    phone:{
        type:String,
        required:true,
        min : 1000000000,
        max : 9999999999
    },
    address:{
        type:String,
        required:true
    },
    paymentType:{
        type:String,
        default:"COD",
        required:true
    },
    status:{
        type:String,
        default:"Order Placed",
        required:true
    }
    
},{timestamps:true})

module.exports=mongoose.model('Order',orderSchema);