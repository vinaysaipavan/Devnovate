import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  category: string;
  content: string;
  author?: string; // optional
  createdAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBlog>("Blog", BlogSchema);
