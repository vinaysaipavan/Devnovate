// src/pages/blog/SingleBlogPage.tsx

import React, { type JSX } from "react";

export default function SingleBlogPage(): JSX.Element {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Single Blog Page</h1>
      <p className="mt-4 text-gray-600">
        This page will display the details of one blog post.
      </p>
    </div>
  );
}
