
import mongoose, { Document, Model, Schema } from "mongoose";

export interface Iuser extends Document{
    name?: string;
    email: string;
    password: string;
    token?: string;
    uploadCount: number;
    downloadCount: number;
    createdAt : Date;
    updatedAt : Date;
}

const userSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    token : {
        type : String
    },
    uploadCount : {
        type : Number,
        default : 0
    },
    downloadCount : {
        type : Number,
        default : 0
    }
},{
    timestamps : true
}

)


const User : Model<Iuser> = mongoose.model<Iuser>("User",userSchema)
export default User