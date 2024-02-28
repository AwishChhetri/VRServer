import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
       
    },
    email:{
        type:String,
        required:true,
        // unique:true
    },
    number:{
       type:Number,
       unique:true,
    },
    password:{
        type:String,
    },
    propDoc:{
        type:String,
        
    },
    userDoc:{
        type:String,
        
    }
},{
    timestamps:true
}
)


export default mongoose.model("user", userSchema);