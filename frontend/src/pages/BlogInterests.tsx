import React, { useState } from "react";

const topics = [
  "Artificial Intelligence",
  "Web Development",
  "Mobile App Development",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "Blockchain",
  "DevOps",
  "UI/UX Design",
  "Programming Tips",
  "Databases",
  "Machine Learning",
];

const BlogInterests: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (topic: string) => {
    if (selected.includes(topic)) {
      setSelected(selected.filter((t) => t !== topic));
    } else {
      setSelected([...selected, topic]);
    }
  };

  const handleSubmit = () => {
    console.log("Selected Topics:", selected);
    // later send to backend via API (axios/fetch)
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Choose Your Blog Interests
      </h1>
      <p className="text-gray-700 mb-4">
        Select topics you would love to read or write about. 🚀
      </p>

      <div className="grid grid-cols-2 gap-4">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => toggleSelect(topic)}
            className={`p-3 rounded-xl border transition ${
              selected.includes(topic)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
      >
        Save Interests
      </button>
    </div>
  );
};

export default BlogInterests;
