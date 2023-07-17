import { model, Schema, Types } from "mongoose";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  MODERATOR = "MODERATOR",
}

export default interface User {
  _id: Types.ObjectId;
  address: string;
  name: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  cover?: string;
  email: string;
  nation?: string;
  lang?: string;
  postCnt: number;
  following: Types.Array<Types.ObjectId>;
  role: string;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

const schema = new Schema<User>({
  address: {
    type: Schema.Types.String,
    trim: true,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  displayName: {
    type: Schema.Types.String,
  },
  bio: {
    type: Schema.Types.String,
  },
  avatar: {
    type: Schema.Types.String,
  },
  cover: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  nation: {
    type: Schema.Types.String,
  },
  lang: {
    type: Schema.Types.String,
  },
  postCnt: {
    type: Schema.Types.Number,
    default: 0,
  },
  following: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "communities",
      },
    ],
    default: [],
  },
  role: {
    type: Schema.Types.String,
    enum: Object.values(Role),
    default: Role.USER,
  },
  active: {
    type: Schema.Types.Boolean,
    default: true,
  },
  createdAt: {
    type: Schema.Types.Date,
  },
  updatedAt: {
    type: Schema.Types.Date,
  },
});

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
