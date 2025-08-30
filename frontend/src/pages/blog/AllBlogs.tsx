import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  category: string;
  image: string;
  status: string;
}

// Mock data
const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "Getting Started with React",
    excerpt: "Learn the basics of React and how to create your first component.",
    author: "Jane Smith",
    date: "2025-01-15",
    likes: 42,
    comments: 12,
    category: "Development",
    image: "/images/react.png",
    status: "published",
  },
  {
    id: 2,
    title: "Mastering MongoDB",
    excerpt: "Advanced techniques for working with MongoDB in your Node.js applications.",
    author: "John Doe",
    date: "2025-01-12",
    likes: 35,
    comments: 8,
    category: "Database",
    image: "/images/mongodb.png",
    status: "published",
  },
  {
    id: 3,
    title: "AI & ML Basics",
    excerpt: "Explore the world of Artificial Intelligence and Machine Learning and how algorithms learn from data.",
    author: "Alex Johnson",
    date: "2025-01-10",
    likes: 78,
    comments: 15,
    category: "AI & ML",
    image: "/images/ai-ml.png",
    status: "published",
  },
];

const AllBlogs: React.FC = () => {
  const [blogs] = useState<Blog[]>(mockBlogs);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {blog.category}
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>By {blog.author}</span>
                <span>{blog.date}</span>
              </div>
              <div className="flex space-x-4 text-sm text-gray-600 mb-4">
                <span>❤️ {blog.likes}</span>
                <span>💬 {blog.comments}</span>
              </div>
              <Link
                to={`/blog/${blog.id}`}
                className="inline-block border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
