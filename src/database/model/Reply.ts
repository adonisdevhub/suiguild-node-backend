import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Reply';
export const COLLECTION_NAME = 'replies';

export default interface Reply {
  _id: Types.ObjectId;
  pId: Types.ObjectId;
  cId: Types.ObjectId;
  replyOf: Types.ObjectId;
  poster: Types.ObjectId;
  content: string;
  createdAt: Date;
}

const schema = new Schema<Reply>(
  {
    pId: {
      type: Schema.Types.ObjectId,
      ref: 'posts',
      required: true
    },
    cId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    replyOf: {
      type: Schema.Types.ObjectId,
      default: null
    },
    poster: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    content: {
      type: Schema.Types.String,
      required: true,
      select: false
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      default: Date.now()
    }
  }
);

export const ReplyModel = model<Reply>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME,
);