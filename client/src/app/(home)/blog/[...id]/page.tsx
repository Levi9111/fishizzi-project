'use client';

import { getDataFromDB } from '@/api';
import Loader from '@/components/Loader';
import { useUser } from '@/ContextProvider/Provider';
import { TBlog } from '@/Interface';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BlogDetailsPage = () => {
  const { base_url } = useUser();
  const params = useParams();
  const [blog, setBlog] = useState<TBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getDataFromDB(`${base_url}/blogs/${params.id}`);
        setBlog(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [base_url, params.id]);

  if (loading) return <Loader />;

  if (!blog) {
    return (
      <div className='text-center py-20'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>No Blog Found</h1>
        <Link href='/blog'>
          <button className='bg-blue-600 text-white px-6 py-2 rounded-md'>
            Return to Blogs
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className='md:max-w-4xl max-w-[95%] w-fixedScreen mx-auto py-8'>
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>{blog.title}</h1>
      <p className='text-gray-600 text-sm mb-8'>
        {new Date(blog.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <Image
        src={blog.blogImgUrl}
        alt={blog.title}
        width={1700}
        height={1200}
        className='w-full h-96 object-cover rounded-md mb-8'
      />

      <div className='space-y-6'>
        {blog.content.map((para: string, index: number) => (
          <p key={index} className='text-gray-700 leading-relaxed'>
            {para}
          </p>
        ))}
      </div>

      <Link href='/blog'>
        <button className='mt-8 bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition'>
          Back to Blogs
        </button>
      </Link>
    </div>
  );
};

export default BlogDetailsPage;
