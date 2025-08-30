// components/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
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
              <li><Link to="/blogs/category/development" className="text-gray-400 hover:text-white transition duration-300">Development</Link></li>
              <li><Link to="/blogs/category/database" className="text-gray-400 hover:text-white transition duration-300">Database</Link></li>
              <li><Link to="/blogs/category/design" className="text-gray-400 hover:text-white transition duration-300">Design</Link></li>
              <li><Link to="/blogs/category/devops" className="text-gray-400 hover:text-white transition duration-300">DevOps</Link></li>
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
  );
};

export default Footer;