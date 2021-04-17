import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type: String, req:true},
    email:{type:String, req:true, unique:true},
    password:{type: String, req:true},
    isAdmin:{type:Boolean, default:false, required:true},
    isSeller:{type:Boolean, default:false, required:true}
}, {
    timestamps:true
}) 

const User = mongoose.model("User",userSchema);
export default User;