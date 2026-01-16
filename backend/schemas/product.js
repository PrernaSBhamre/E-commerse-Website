const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    images:{
        type:[String]
    },
    stock:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Product',productSchema);
