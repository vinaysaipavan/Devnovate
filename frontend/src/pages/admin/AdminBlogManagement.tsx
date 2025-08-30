export default function AdminBlogManagement() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Blog Management</h1>
      <p className="mt-4 text-gray-600">
        Here the admin can view, edit, and delete user blogs.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example blog card */}
        <div className="bg-white shadow-md rounded-lg p-4 border">
          <h2 className="text-xl font-semibold">Sample Blog Title</h2>
          <p className="text-gray-500 mt-2">Short description of the blog...</p>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Edit
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
