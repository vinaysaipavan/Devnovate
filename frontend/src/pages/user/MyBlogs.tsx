import { Link } from "react-router-dom";

const MyBlogs: React.FC = () => {
  return (
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">My Blogs</h1>
      <p className="text-gray-600 mb-6 text-center">
        You haven't created any blogs yet. Start sharing your knowledge with the community!
      </p>
      <Link
        to="/create-blog"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
      >
        Create New Blog
      </Link>
    </div>
  );
};

export default MyBlogs;
