import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
     phone:{
        type:Number,
        required:true,

    },
  
    role:{
        type:Number,
        default:0  //means false 1 ,means true
    }
    ,
    user:{
        type:String,
    }
    // role:{
    // "type": "string",
    // "enum": ["admin", "buyer","user"]
    // }
},{timestamps:true})

// export model

export default mongoose.model('users',userSchema)