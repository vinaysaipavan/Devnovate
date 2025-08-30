import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockBlogs = [
  {
    id: 1,
    title: "Getting Started with React",
    excerpt: "Learn the basics of React and how to create your first component.",
    author: "Jane Smith",
    date: "2025-01-15",
    likes: 42,
    comments: 12,
    category: "Development",
    image: "https://via.placeholder.com/400x250/4f46e5/ffffff?text=React",
    status: "published"
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
    image: "https://via.placeholder.com/400x250/10b981/ffffff?text=MongoDB",
    status: "published"
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
    image: "https://via.placeholder.com/400x250/f59e0b/ffffff?text=Future",
    status: "published"
  },
  {
    id: 4,
    title: "CSS Tricks for Responsive Design",
    excerpt: "Useful CSS techniques to make your websites look great on all devices.",
    author: "Sarah Williams",
    date: "2025-01-08",
    likes: 29,
    comments: 5,
    category: "Design",
    image: "https://via.placeholder.com/400x250/ef4444/ffffff?text=CSS",
    status: "published"
  },
];

const mockTrendingBlogs = [...mockBlogs].sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments)).slice(0, 3);

const Home = () => {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [trendingBlogs, setTrendingBlogs] = useState(mockTrendingBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in (in a real app, this would come from authentication context)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Check if user is admin (in a real app, this would come from decoded token)
      const userRole = localStorage.getItem('role');
      if (userRole === 'admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would filter blogs or make an API call
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="logo mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">Devnovate Blog</Link>
          </div>
          <nav className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center space-x-4 md:space-x-6">
              <li><Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">Home</Link></li>
              <li><Link to="/blogs" className="text-gray-600 hover:text-indigo-600 font-medium">All Blogs</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-indigo-600 font-medium">Contact</Link></li>
              {isLoggedIn ? (
                <>
                  <li><Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</Link></li>
                  {isAdmin && <li><Link to="/admin" className="text-gray-600 hover:text-indigo-600 font-medium">Admin</Link></li>}
                  <li><Link to="/logout" className="text-gray-600 hover:text-indigo-600 font-medium">Logout</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium">Login</Link></li>
                  <li><Link to="/register" className="text-gray-600 hover:text-indigo-600 font-medium">Register</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Share Your Knowledge with the Dev Community</h1>
            <p className="text-xl mb-8">Read, write, and engage with technical articles on the latest in web development</p>
            {isLoggedIn ? (
              <Link to="/create-blog" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg inline-block transition duration-300">Write a Blog</Link>
            ) : (
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg inline-block transition duration-300">Get Started</Link>
            )}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Search for blogs, topics, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">Search</button>
          </form>
        </div>
      </section>

      {/* Trending Blogs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trending Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingBlogs.map(blog => (
              <div key={blog.id} className="blog-card bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{blog.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>By {blog.author}</span>
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex space-x-4 text-sm text-gray-600 mb-5">
                    <span><i className="fas fa-heart mr-1 text-red-500"></i> {blog.likes} likes</span>
                    <span><i className="fas fa-comment mr-1 text-blue-500"></i> {blog.comments} comments</span>
                  </div>
                  <Link to={`/blog/${blog.id}`} className="inline-block border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition duration-300">Read More</Link>
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
            {blogs.map(blog => (
              <div key={blog.id} className="blog-card-horizontal bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:w-2/3">
                  <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">{blog.category}</span>
                  <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-5">
                    <span>By {blog.author}</span>
                    <span>{blog.date}</span>
                  </div>
                  <Link to={`/blog/${blog.id}`} className="inline-block border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition duration-300">Read More</Link>
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
            <Link to="/category/development" className="category-card bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl text-center transition-transform duration-300">
              <h3 className="text-xl font-bold mb-3">Development</h3>
              <p className="text-indigo-100">JavaScript, React, Node.js and more</p>
            </Link>
            <Link to="/category/database" className="category-card bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl text-center transition-transform duration-300">
              <h3 className="text-xl font-bold mb-3">Database</h3>
              <p className="text-indigo-100">MongoDB, SQL, and data modeling</p>
            </Link>
            <Link to="/category/design" className="category-card bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl text-center transition-transform duration-300">
              <h3 className="text-xl font-bold mb-3">Design</h3>
              <p className="text-indigo-100">UI/UX, CSS, and responsive design</p>
            </Link>
            <Link to="/category/devops" className="category-card bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl text-center transition-transform duration-300">
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
            <p className="text-xl mb-8">Join our community of developers and start publishing your technical articles today.</p>
            {isLoggedIn ? (
              <Link to="/create-blog" className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-8 rounded-lg inline-block transition duration-300">Write Your First Blog</Link>
            ) : (
              <Link to="/register" className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-8 rounded-lg inline-block transition duration-300">Create an Account</Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-5">Devnovate Blog</h3>
              <p className="text-gray-400">A platform for developers to share knowledge and insights about web development technologies.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-5">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
                <li><Link to="/blogs" className="text-gray-400 hover:text-white transition duration-300">All Blogs</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition duration-300">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-5">Categories</h4>
              <ul className="space-y-3">
                <li><Link to="/category/development" className="text-gray-400 hover:text-white transition duration-300">Development</Link></li>
                <li><Link to="/category/database" className="text-gray-400 hover:text-white transition duration-300">Database</Link></li>
                <li><Link to="/category/design" className="text-gray-400 hover:text-white transition duration-300">Design</Link></li>
                <li><Link to="/category/devops" className="text-gray-400 hover:text-white transition duration-300">DevOps</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-5">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition duration-300" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition duration-300" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition duration-300" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition duration-300" aria-label="Discord">
                  <i className="fab fa-discord"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Devnovate Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;























// // import React,{useEffect, useState} from 'react'
// // import { fetchVideosForPublic, selectPublicVideos, selectVideoLoading } from '../reducers/video/videoReducer'
// // import { useDispatch, useSelector } from 'react-redux'
// // import type { AppDispatch } from '../reducers/store'
// // import { FaPlay } from 'react-icons/fa'
// // import ReactPlayer from 'react-player'
// // import HeroVideoCard from '../components/HeroVideoCard'
// // import VideoSlider from '../components/VideoSlider'
// // import 'react-loading-skeleton/dist/skeleton.css'
// // import Skeleton from 'react-loading-skeleton'


// // const Home : React.FC = () => {
// //     const publicVideos = useSelector(selectPublicVideos)
// //     const isLoading = useSelector(selectVideoLoading)
// //     const [isPlaying,setIsPlaying] = useState<boolean>(false)
// //     const dispatch = useDispatch<AppDispatch>()
// //     useEffect(() => {
// //       dispatch(fetchVideosForPublic())
// //     },[publicVideos])
    
// //   return (
// //     <>
// //     <div className='heroSection relative w-full h-[80vh]'>
// //   {!isPlaying && 
// //     <div
// //       style={{ zIndex: 5 }} 
// //       className='absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-black to-gray-700 flex flex-col items-center justify-center text-center px-4'
// //     >
// //       <h1 className='text-4xl font-bold capitalize mb-4 md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-300 to-yellow-800'>
// //         Create Your Videos and Publish
// //       </h1>
// //       <p className='text-lg mb-6 md:text-xl font-extralight text-white max-w-2xl'>
// //         Reach More Subscribers and Get Likes and comments on your video by just watching our basic tutorial videos.
// //       </p>
// //       <button className='bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg hover:scale-105 transform animate-scale-pulse mb-4'>
// //   <FaPlay className='text-2xl' />
// // </button>

// //       <button 
// //         className='bg-blue-500 text-black px-6 py-3 mt-2 rounded shadow-lg hover:bg-blue-200 transition duration-300' 
// //         onClick={() => setIsPlaying(true)}
// //       >
// //         Watch Now
// //       </button>
// //     </div>
// //   }

// //   <div 
// //     className={`absolute top-0 left-0 w-full h-full ${isPlaying ? "block" : "hidden"}`} 
// //     style={{ zIndex: isPlaying ? 0 : 1 }}
// //   >
// //     <ReactPlayer 
// //       src='https://youtu.be/d7t_ui8ON9w' 
// //       controls 
// //       width='100%' 
// //       height='100%' 
// //     />
// //   </div>
// // </div>

// //      <main className='w-[95vw] relative px-6'>
// //            <h2 className='capitalize text-textTwo text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-2 p-4'>
// //                Recently Added
// //            </h2>

// //            {!isLoading ? 
// //            <div className='w-full flex justify-center'>
// //               <Skeleton height={300} width={800}/>
// //            </div> : <VideoSlider videos={publicVideos}/>}
           
// //      </main>
// //     </>
// //   )
// // }

// // export default Home
