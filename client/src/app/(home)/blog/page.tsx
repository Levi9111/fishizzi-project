'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/ContextProvider/Provider';
import { useEffect, useState } from 'react';
import { getDataFromDB } from '@/api';
import { TBlog } from '@/Interface';
import Loader from '@/components/Loader';

const BlogPage = () => {
  const { base_url } = useUser();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getDataFromDB(`${base_url}/blogs`);
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [base_url]);

  if (loading) return <Loader />;

  return (
    <div className='md:max-w-full w-fixedScreen max-w-[95%] mx-auto py-8'>
      <h1 className='text-4xl font-bold text-gray-800 mb-6'>All Blogs</h1>
      <div className='space-y-8'>
        {blogs?.map((blog: TBlog) => (
          <div
            key={blog._id}
            className='flex flex-col md:flex-row items-start gap-6 border-b pb-8'
          >
            <Image
              src={blog.blogImgUrl}
              alt={blog.title}
              width={600}
              height={400}
              className='w-full md:w-64 h-40 object-cover rounded-md'
            />
            <div>
              <h2 className='text-2xl font-semibold mb-2'>{blog.title}</h2>
              <p className='text-gray-500 text-sm mb-4'>
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className='text-gray-700 mb-4 line-clamp-2'>
                {blog.content[0]}
              </p>
              <Link href={`/blog/${blog._id}`}>
                <span className='text-blue-600 hover:underline cursor-pointer'>
                  Read More →
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
