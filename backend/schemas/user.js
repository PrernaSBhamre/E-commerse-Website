const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength: 6 // Password should be at least 6 characters
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
        required:true
    },
    address:{
        type:[Object],
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports=mongoose.model('User',userSchema);
