import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">About Devnovate</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        <span className="font-semibold">Devnovate</span> is a dynamic platform 
        built to inspire, connect, and empower developers. 💡  
        Our goal is to bring together innovators, learners, and creators in a 
        collaborative environment where ideas turn into impactful solutions.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        Whether you’re a beginner exploring new technologies, a professional 
        looking to share your expertise, or a team collaborating on projects, 
        Devnovate provides the tools and space to grow. 🌐  
      </p>
      <p className="text-gray-700 text-lg leading-relaxed">
        We are passionate about building a hub that drives creativity, fosters 
        learning, and encourages innovation within the developer community. 🚀
      </p>
    </div>
  );
};

export default About;
