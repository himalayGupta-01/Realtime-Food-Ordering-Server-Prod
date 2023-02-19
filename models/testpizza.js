const mongoose=require('mongoose');


const testPizza=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    size:{
        type:String,
        required:true,
    }

})

const TestMenu =mongoose.model('Testpizza',testPizza)


module.exports=TestMenu;