'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/ContextProvider/Provider';
import { useEffect, useState } from 'react';
import { getDataFromDB, deleteDataFromDB } from '@/api';
import { TBlog } from '@/Interface';
import Loader from '@/components/Loader';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

const BlogPage = () => {
  const { base_url, admin_email, developer_email, user } = useUser();
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getDataFromDB(`${base_url}/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [base_url]);

  const handleDeleteBlog = async () => {
    if (!selectedBlog) return;

    try {
      await deleteDataFromDB(`${base_url}/blogs/${selectedBlog}`);
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== selectedBlog),
      );
      toast.success('Blog deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete blog');
    } finally {
      setSelectedBlog(null); // Reset selection after deletion
    }
  };

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
            <div className='flex-1'>
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

              {/* Delete Button with Alert Dialog */}
              {(user?.email === admin_email ||
                user?.email === developer_email) && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className='text-red-600 hover:text-red-700 hover:underline transition ml-4'
                      onClick={() => setSelectedBlog(blog._id)}
                    >
                      Delete Blog
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this blog? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteBlog}
                        className='bg-red-600 hover:bg-red-700'
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
