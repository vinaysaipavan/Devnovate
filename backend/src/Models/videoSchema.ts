import mongoose, { Document, Model, Schema } from "mongoose";

export interface Ivideo extends Document{
    title?: string;
    description?: string;
    path: string;
    uploadedBy?: mongoose.Schema.Types.ObjectId;
    isPrivate : boolean;
    thumbNail?: string;
    createdAt : Date;
    updatedAt : Date;
}


const videoSchema : Schema = new mongoose.Schema({
    title : {
        type : String,
        default : "default title"
    },
    description : {
        type : String,
        default : "default Description"
    },
    path : {
        type : String,
        required :true
    },
    uploadedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    isPrivate : {
        type : Boolean,
        default : false
    },
    thumbNail : {
        type : String,
        default : "https://t3.ftcdn.net/jpg/04/70/37/00/360_F_470370030_TxVCOsONUxh659YzwP2wCkX0ijAetDh9.jpg"
    }
},{timestamps : true})

const Video : Model<Ivideo> = mongoose.model<Ivideo>("Video",videoSchema)

export default Video