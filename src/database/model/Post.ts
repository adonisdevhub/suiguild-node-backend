import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Post';
export const COLLECTION_NAME = 'posts';

interface Comment {
  _id: Types.ObjectId;
  poster: Types.ObjectId;
  content: string;
  createdAt: Date;
}

export default interface Post {
  _id: Types.ObjectId;
  community: Types.ObjectId;
  title: string;
  content: string;
  poster: Types.ObjectId;
  notify: boolean;
  createdAt: Date;
  comments: Types.DocumentArray<Comment>;
  voteCnt: number;
}

const schema = new Schema<Post>(
  {
    community: {
      type: Schema.Types.ObjectId,
      ref: 'communities',
      required: true
    },
    title: {
      type: Schema.Types.String,
      required: true,
      select: false
    },
    content: {
      type: Schema.Types.String,
      required: true,
      select: false
    },
    poster: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      require: true,
      select: false
    },
    notify: {
      type: Schema.Types.Boolean,
      required: true,
      default: false
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      select: false
    },
    comments: {
      type: [
        {
          poster: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
          },
          content: {
            type: Schema.Types.String,
            required: true
          },
          createdAt: {
            type: Schema.Types.Date,
            required: true,
            select: false
          }
        }
      ]
    },
    voteCnt: {
      type: Schema.Types.Number,
      default: 0
    }
  }
);

export const PostModel = model<Post>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME,
);
