import React from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface UploadProps {
  onUploadComplete: (url: string) => void;
}

const UploadComponent: React.FC<UploadProps> = ({ onUploadComplete }) => {
  const [url,setUrl] = React.useState<string>('');
  const [loading,setLoading] = React.useState<boolean>(false)
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = e.target.files?.[0];
    if (!file) return toast.error("File is required");

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true)
      const { data } = await axios.post("http://localhost:3000/api/v1/media/upload", formData);
      if (data?.url) {
        toast.success("Uploaded!");
        setUrl(data.url)
        onUploadComplete(data.url); // pass url back to parent
      }
    } catch (err) {
      toast.error("Upload failed");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="max-w-md mx-auto  p-6 bg-white border border-black shadow-xl rounded-2xl text-center">
  

  <input
    type="file"
    onChange={handleUpload}
    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer"
    />

  {loading && (
    <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-medium">
      <span>Uploading...</span>
      <span className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )}

  {url && (
    <div className="mt-6">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-green-700 underline hover:text-green-900 font-medium"
      >
        View Uploaded File
      </a>
    </div>
  )}
</div>

  );
};

export default UploadComponent;

