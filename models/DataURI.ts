import mongoose, { Schema } from "mongoose";

export interface IDataURI {
  _id?: mongoose.Types.ObjectId | string;
  src: string;
  originalName: string;
  mimeType: string;
  size: number;
  owner: mongoose.Types.ObjectId | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  isLoading?: boolean;
}

const dataUriSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const DataURI =
  mongoose.models.DataURI || mongoose.model<IDataURI>("DataURI", dataUriSchema);

export default DataURI;
