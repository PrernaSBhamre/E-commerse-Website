const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const cartSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
  
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            }
        }
    ],
    updatedAt:{
        type:Date,
        default:Date.now,
        required:true
    }
});
module.exports=mongoose.model('Cart',cartSchema);
