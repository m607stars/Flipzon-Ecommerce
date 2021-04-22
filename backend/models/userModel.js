import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type: String, req:true},
    email:{type:String, req:true, unique:true},
    password:{type: String, req:true},
    isAdmin:{type:Boolean, default:false, required:true},
    isSeller:{type:Boolean, default:false, required:true},
    seller:{
        name:String,
        logo:String,
        description:String,
        rating:{ type: Number, default: 0, required: true },
        numReview:{ type:Number, default:0, required:true },
    }
}, {
    timestamps:true
}) 

const User = mongoose.model("User",userSchema);
export default User;