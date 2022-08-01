import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,

    },
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ProfilePic:{
        type:String,
        default:""
    }
},
{
    timestamps:true
});

export default mongoose.model("User", UserSchema);

