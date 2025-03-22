import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { postToDB } from '@/api';
import { useUser } from '@/ContextProvider/Provider';
import { toast } from 'sonner';

type FormValues = {
  title: string;
  content: string[];
  image: File;
};

const CreateBlogForm = () => {
  const { base_url } = useUser();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      content: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error: useFieldArray name is typed as string but we are using it for content array
    name: 'content',
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const formData = new FormData();

    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    formData.append('data', JSON.stringify({ blog: data }));
    try {
      const result = await postToDB(`${base_url}/blogs/create-blog`, formData);
      toast.success(result.message);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>
        Create a New Blog
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Title Input */}
        <div>
          <label className='block text-gray-700'>Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter blog title'
          />
          {errors.title && (
            <p className='text-red-500 text-sm'>{errors.title.message}</p>
          )}
        </div>

        {/* Image Input */}
        <div>
          <label className='block text-gray-700'>Upload Image</label>
          <input
            type='file'
            accept='image/*'
            {...register('image', {
              validate: () => (selectedFile ? true : 'Image is required'),
            })}
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className='w-full p-2 border rounded'
          />

          {/* {errors.image && (
            <p className='text-red-500 text-sm'>{errors.image.message}</p>
          )} */}
        </div>
        {/* Content Input */}
        <div>
          <label className='block text-gray-700'>Content</label>
          {fields.map((field, index) => (
            <div key={field.id} className='flex gap-2 items-center mb-2'>
              <textarea
                {...register(`content.${index}`, {
                  required: 'Content is required',
                })}
                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder={`Paragraph ${index + 1}`}
              />
              <button type='button' onClick={() => remove(index)}>
                <Trash2 className='text-red-500' />
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={() => append('')}
            className='flex items-center gap-2 text-blue-600 mt-2'
          >
            <PlusCircle /> Add Paragraph
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Create Blog'}
        </Button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
