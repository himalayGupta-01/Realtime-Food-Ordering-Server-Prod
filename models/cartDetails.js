const mongoose=require('mongoose');


const cartDetail=new mongoose.Schema({
    expires:{
        type:Date,
        required:true,
    },
    session:{
        type:String,
        required:true,
    }
})

const cartDetails =mongoose.model('session',cartDetail)


module.exports=cartDetails;