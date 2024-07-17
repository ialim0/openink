"use client"
import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useDarkMode } from '@/context/DarkModeContext';
import { debounce } from 'lodash';
import { PlusIcon, PhotographIcon, TagIcon, SaveIcon, EyeIcon, CloudUploadIcon, LogoutIcon } from '@heroicons/react/outline';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const EditBlogPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const { darkMode } = useDarkMode();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/admin');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleContentChange = (value: string) => {
    setContent(value);
    updateWordCountAndReadingTime(value);
  };

  const updateWordCountAndReadingTime = (text: string) => {
    const words = text.split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setReadingTime(Math.ceil(words.length / 200));
  };

  const handleTagChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      setTags([...tags, e.currentTarget.value]);
      e.currentTarget.value = '';
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const autoSave = useCallback(debounce(() => {
    console.log('Auto-saving...', { title, content, tags, featuredImage });
  }, 2000), [title, content, tags, featuredImage]);

  useEffect(() => {
    autoSave();
  }, [title, content, tags, featuredImage, autoSave]);

  const handlePublish = () => {
    console.log('Publishing:', { title, content, tags, featuredImage });
  };

  const handlePreview = () => {
    console.log('Previewing:', { title, content, tags, featuredImage });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center pt-10"> {/* Added padding top */}
        <h1 className="text-2xl font-bold">Edit Blog Post</h1>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
            <SaveIcon className="w-5 h-5 mr-2" />
            Save Draft
          </button>
          <button onClick={handlePreview} className="flex items-center px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
            <EyeIcon className="w-5 h-5 mr-2" />
            Preview
          </button>
          <button onClick={handleLogout} className="flex items-center px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">
            <LogoutIcon className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8"> 
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter your title"
            className={`w-full text-4xl font-bold mb-8 p-2 ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } border-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />

          <div className="mb-8 flex items-center space-x-4">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="featured-image"
              />
              <label
                htmlFor="featured-image"
                className={`flex items-center px-4 py-2 rounded-md ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                } cursor-pointer`}
              >
                <PhotographIcon className="w-5 h-5 mr-2" />
                {featuredImage ? 'Change Featured Image' : 'Add Featured Image'}
              </label>
            </div>
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Add tags (press Enter to add)"
                onKeyDown={handleTagChange}
                className={`w-full p-2 ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                } border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <div className="mt-2 flex flex-wrap">
                {tags.map((tag, index) => (
                  <span key={index} className="mr-2 mb-2 px-2 py-1 bg-blue-500 text-white rounded-md text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {featuredImage && (
            <div className="mb-8">
              <img src={featuredImage} alt="Featured" className="w-full h-64 object-cover rounded-lg" />
            </div>
          )}

          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            placeholder="Tell your story..."
            className={`${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}
          />

          <div className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {wordCount} words · {readingTime} min read
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePublish}
            className={`mt-8 px-6 py-3 rounded-full text-white bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out flex items-center justify-center`}
          >
            <CloudUploadIcon className="w-5 h-5 mr-2" />
            Publish
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default EditBlogPage;
