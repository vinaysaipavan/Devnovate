import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">About Us</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        Welcome to <span className="font-semibold">MyVideoHub</span>! 🎬  
        This platform is built to share blogs, videos, and ideas for the
        hackathon community. Our mission is to connect creators, developers,
        and innovators through engaging content.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed">
        Whether you’re here to learn, share, or collaborate, this hub is for
        you. We are a team of passionate developers building a space where
        creativity meets technology. 🚀
      </p>
    </div>
  );
};

export default About;
