import React, { useState } from 'react';
import UploadComponent from '../../components/UploadComponent';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { VideoCreate } from '../../reducers/auth/authReducer';
import type { AppDispatch } from '../../reducers/store';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ParentComponent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    path: '',
    uploadedBy: null,
    isPrivate: false,
    thumbNail: '',
  });
  const [loading,setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      isPrivate: e.target.value === 'Private',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try{
      if (formData.path === '') return toast.error('Please attach Video');

      console.log('Form Submitted');
      console.log('Form Data is\n', formData);
      dispatch(VideoCreate(formData));
  
      setFormData({
        title: '',
        description: '',
        path: '',
        uploadedBy: null,
        isPrivate: false,
        thumbNail: '',
      });
    }
    catch(error){
      console.log("Some Error")
      toast.error("Some thing went wrong")
    }
    finally{
      setLoading(false);
    }
    
  };

  return (
   
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10"
      >
        <h2 className="text-xl font-bold mb-6">Video</h2>

        {/* Video File */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Video</label>
          <UploadComponent
            onUploadComplete={url => setFormData(prev => ({ ...prev, path: url }))}
          />
        </div>

        {/* Thumbnail */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Thumbnail <span className="text-sm text-gray-500">(Optional)</span>
          </label>
          <UploadComponent
            onUploadComplete={url => setFormData(prev => ({ ...prev, thumbNail: url }))}
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Title <span className="text-sm text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter title of your video"
          />
        </div>

        {/* Description */}
        {/* <div className="mb-4">
          <label className="block mb-1 font-medium">
            Description <span className="text-sm text-gray-500">(Optional)</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={e =>
              setFormData(prev => ({ ...prev, description: e.target.value }))
            }
            rows={4}
            className="w-full border px-3 py-2 rounded"
            placeholder="Add description..."
          ></textarea>
        </div> */}

        <div className="mb-6">
          <label htmlFor="description">Description</label>
        <ReactQuill theme="snow"  className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        value={formData.description}
        onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
        placeholder="Add description..."/>
        </div>

        {/* Privacy */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Privacy</label>
          <select
            name="privacy"
            value={formData.isPrivate ? 'Private' : 'Public'}
            onChange={handlePrivacyChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            disabled={loading}
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800  disabled:bg-gray-700 "
          >
            {loading ? (
    <>
      <span>Uploading...</span>
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    </>
  ) : (
    "Upload"
  )}
          </button>
        </div>
      </form>
    
  );
};

export default ParentComponent;
