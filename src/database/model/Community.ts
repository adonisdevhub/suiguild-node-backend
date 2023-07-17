import { model, Schema, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Community';
export const COLLECTION_NAME = 'communities';

export default interface Community {
  _id: Types.ObjectId;
  avatar: string;
  cover: string;
  visible: boolean;
  title: string;
  description: string;
  creator: Types.ObjectId;
  createdAt: Date;
  postCnt: number;
  commentCnt: number;
  followingCnt: number;
}

const schema = new Schema<Community>(
  {
    avatar: {
      type: Schema.Types.String,
      required: true
    },
    cover: {
      type: Schema.Types.String,
      required: true
    },
    visible: {
      type: Schema.Types.Boolean,
      required: true,
      default: false
    },
    title: {
      type: Schema.Types.String,
      required: true
    },
    description: {
      type: Schema.Types.String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      // required: true
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true
    },
    postCnt: {
      type: Schema.Types.Number,
      default: 0
    },
    commentCnt: {
      type: Schema.Types.Number,
      default: 0
    },
    followingCnt: {
      type: Schema.Types.Number,
      default: 0
    }
  }    
);

export const CommunityModel = model<Community>(DOCUMENT_NAME, schema, COLLECTION_NAME);