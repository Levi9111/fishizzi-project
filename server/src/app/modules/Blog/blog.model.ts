import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true, minlength: 5 },
    blogImgUrl: { type: String, required: true },
    content: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

export const Blog = model<TBlog>('Blog', blogSchema);
