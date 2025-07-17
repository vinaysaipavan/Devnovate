import React, { useEffect, useState } from 'react';
import UploadComponent from '../components/UploadComponent';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VideoCreate } from '../reducers/auth/authReducer';
import type { AppDispatch } from '../reducers/store';
import { selectEditingVideo, type IVideo } from '../reducers/video/videoReducer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateVideo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const reduxEditVideo = useSelector(selectEditingVideo);
  
  // Get video from localStorage safely
  const getLocalVideo = (): IVideo | null => {
    try {
      const localEdit = localStorage.getItem("editVideo");
      return localEdit ? JSON.parse(localEdit) : null;
    } catch (error) {
      console.error("Error parsing localStorage video:", error);
      return null;
    }
  };

  const editVideo = reduxEditVideo || getLocalVideo();

  // Initialize formData with editVideo if it exists
  const [formData, setFormData] = useState(() => {
    if (editVideo) {
      return {
        title: editVideo.title || '',
        description: editVideo.description || '',
        path: editVideo.path || '',
        uploadedBy: editVideo.uploadedBy || { email: '' },
        isPrivate: editVideo.isPrivate || false,
        thumbNail: editVideo.thumbNail || '',
      };
    }
    return {
      title: '',
      description: '',
      path: '',
      uploadedBy: { email: '' },
      isPrivate: false,
      thumbNail: '',
    };
  });

  // Redirect if no video data
  useEffect(() => {
    if (!editVideo) {
      toast.error("No video selected for editing");
      navigate(-1); // Go back
    }
  }, [editVideo, navigate]);

  // Handle Quill description update
  const handleDescriptionChange = (value: string) => {
    setFormData(prev => ({ ...prev, description: value }));
  };

  // Other handlers remain the same...

  if (!editVideo) {
    return <div className="p-4">Loading video data...</div>;
  }

  return (
    <form  className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <h2 className="text-xl font-bold mb-6">Edit Video</h2>

      {/* Video Upload */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Video</label>
        <UploadComponent 
          onUploadComplete={(url) => setFormData(prev => ({ ...prev, path: url }))} 
          // url={editVideo.path}
        />
      </div>

      {/* Thumbnail Upload */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Thumbnail</label>
        <UploadComponent 
          onUploadComplete={(url) => setFormData(prev => ({ ...prev, thumbNail: url }))} 
          // initialUrl={editVideo.thumbNail}
        />
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          // onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Description - Using key to force re-render */}
      <div className="mb-4" key={formData.description}>
        <label className="block mb-1 font-medium">Description</label>
        <ReactQuill
          theme="snow"
          value={formData.description}
          onChange={handleDescriptionChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean']
            ]
          }}
        />
      </div>

      {/* Privacy */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Privacy</label>
        <select
          value={formData.isPrivate ? 'Private' : 'Public'}
          // onChange={handlePrivacyChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      </div>

      {/* Submit */}
      <div className="text-center">
        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateVideo;

