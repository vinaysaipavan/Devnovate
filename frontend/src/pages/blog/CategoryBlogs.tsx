import React from "react";
import { useParams } from "react-router-dom";

type Blog = {
  id: number;
  title: string;
  category: string;
};

const CategoryBlogs: React.FC = () => {
  const { category } = useParams<{ category: string }>(); // e.g., /category/tech → "tech"

  // Sample dummy blogs
  const blogs: Blog[] = [
    { id: 1, title: "React Basics", category: "tech" },
    { id: 2, title: "Healthy Lifestyle Tips", category: "health" },
    { id: 3, title: "Exploring Tailwind CSS", category: "tech" },
  ];

  const filteredBlogs = category
    ? blogs.filter((b) => b.category === category)
    : blogs;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Blogs in{" "}
        <span className="text-blue-500 capitalize">{category || "All"}</span>
      </h1>

      {filteredBlogs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600 mt-2">Category: {blog.category}</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Read More
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No blogs found in this category.</p>
      )}
    </div>
  );
};

export default CategoryBlogs;
