// pages/Home.tsx
import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
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

// Mock data for demonstration
const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "Internet of Things",
    excerpt: "IoT (Internet of Things) connects everyday devices to the internet, allowing them to collect and share data. It enables smarter automation, real-time insights, and improved efficiency across industries.",
    author: "Jane Smith",
    date: "2025-01-15",
    likes: 42,
    comments: 12,
    category: "Development",
    image: "/src/assets/iot.avif",
    status: "published",
  },
  {
    id: 2,
    title: "Cyber Security",
    excerpt: "Cybersecurity is the practice of protecting computers, networks, and data from unauthorized access, attacks, or damage, ensuring confidentiality, integrity, and availability of information.",
    author: "John Doe",
    date: "2025-01-12",
    likes: 35,
    comments: 8,
    category: "Database",
    image: "/src/assets/cyber.jpeg",
    status: "published",
  },
  {
    id: 3,
    title: "The Future of Web Development",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
    author: "Alex Johnson",
    date: "2025-01-10",
    likes: 78,
    comments: 15,
    category: "Technology",
    image: "/src/assets/Webdevelopment.jpg",
    status: "published",
  },
  {
    id: 4,
    title: "Artificial Intelligence & Machine Learning",
    excerpt: "Explore the fascinating world of Artificial Intelligence and Machine Learning, where algorithms learn from data to make predictions, automate tasks, and solve complex problems in real-world applications.",
    author: "Sarah Williams",
    date: "2025-01-08",
    likes: 29,
    comments: 5,
    category: "Design",
    image: "/src/assets/Aiml.jpg",
    status: "published",
  },
];

const mockTrendingBlogs = [...mockBlogs]
  .sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
  .slice(0, 3);

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs);
  const [trendingBlogs, setTrendingBlogs] = useState<Blog[]>(mockTrendingBlogs);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const userRole = localStorage.getItem("role");
      if (userRole === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Share Your Knowledge with the Dev Community
            </h1>
            <p className="text-xl mb-8">
              Read, write, and engage with technical articles on the latest in web
              development
            </p>
            {isLoggedIn ? (
              <Link
                to="/create-blog"
                className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg inline-block transition duration-300"
              >
                Write a Blog
              </Link>
            ) : (
              <Link
                to="/sign-up"
                className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg inline-block transition duration-300"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto flex flex-col md:flex-row gap-3"
          >
            <input
              type="text"
              placeholder="Search for blogs, topics, or authors..."
              value={searchQuery}
              onChange={handleInputChange}
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Trending Blogs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trending Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingBlogs.map((blog) => (
              <div
                key={blog.id}
                className="blog-card bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
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
                  <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>By {blog.author}</span>
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex space-x-4 text-sm text-gray-600 mb-5">
                    <span>
                      <i className="fas fa-heart mr-1 text-red-500"></i> {blog.likes} likes
                    </span>
                    <span>
                      <i className="fas fa-comment mr-1 text-blue-500"></i> {blog.comments} comments
                    </span>
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
      </section>

      {/* Latest Blogs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Blogs</h2>
          <div className="space-y-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="blog-card-horizontal bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {blog.category}
                  </span>
                  <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-5">
                    <span>By {blog.author}</span>
                    <span>{blog.date}</span>
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
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/blogs/category/development"
              className="category-card bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl text-center transition-transform duration-300"
            >
              <h3 className="text-xl font-bold mb-3">Development</h3>
              <p className="text-indigo-100">JavaScript, React, Node.js and more</p>
            </Link>
            <Link
              to="/blogs/category/database"
              className="category-card bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl text-center transition-transform duration-300"
            >
              <h3 className="text-xl font-bold mb-3">Database</h3>
              <p className="text-indigo-100">MongoDB, SQL, and data modeling</p>
            </Link>
            <Link
              to="/blogs/category/design"
              className="category-card bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl text-center transition-transform duration-300"
            >
              <h3 className="text-xl font-bold mb-3">Design</h3>
              <p className="text-indigo-100">UI/UX, CSS, and responsive design</p>
            </Link>
            <Link
              to="/blogs/category/devops"
              className="category-card bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl text-center transition-transform duration-300"
            >
              <h3 className="text-xl font-bold mb-3">DevOps</h3>
              <p className="text-indigo-100">Deployment, CI/CD, and infrastructure</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to share your knowledge?</h2>
            <p className="text-xl mb-8">
              Join our community of developers and start publishing your technical articles today.
            </p>
            {isLoggedIn ? (
              <Link
                to="/create-blog"
                className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-8 rounded-lg inline-block transition duration-300"
              >
                Write Your First Blog
              </Link>
            ) : (
              <Link
                to="/sign-up"
                className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-8 rounded-lg inline-block transition duration-300"
              >
                Create an Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;















