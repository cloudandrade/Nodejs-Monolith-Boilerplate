import mongoose, { Schema, Document } from 'mongoose';

interface IHello extends Document {
  helloText: string;
  createdAt: Date;
}

const HelloSchema: Schema = new Schema({
  helloText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IHello>('Hello', HelloSchema);