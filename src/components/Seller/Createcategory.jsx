import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:4800/api/categories";

export default function ManageCategories() {
  const [name, setName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editId, setEditId] = useState(null);  

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(API);w
      setCategoryList(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

   const saveCategory = async (e) => {
    e.preventDefault();
    if (editId) {
      // Update existing category
      try {
        const response = await axios.put(`${API}/${editId}`, { name });
        setMessage("Category updated successfully!");
        setErrorMessage("");
        setName("");
        setEditId(null);  
        fetchCategories();
      } catch (error) {
        const errMsg =
          error.response?.data?.error || "Failed to update category!";
        setErrorMessage(errMsg);
        setMessage("");
      }
    } else {
      // Create new category
      try {
        const response = await axios.post(API, { name });
        setMessage("Category created successfully!");
        setErrorMessage("");
        setName("");
        fetchCategories();  
      } catch (error) {
        const errMsg =
          error.response?.data?.error || "Failed to create category!";
        setErrorMessage(errMsg);
        setMessage("");
      }
    }
  };

  // Set category to edit
  const editCategory = (id, name) => {
    setEditId(id);
    setName(name);  
  };

  // Delete category
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setMessage("Category deleted successfully!");
      setErrorMessage("");
      fetchCategories(); // Refresh list
    } catch (error) {
      setErrorMessage("Failed to delete category!");
      setMessage("");
    }
  };

  return (
    <div className="flex w-full">

      {/* Main Content */}
      <div className="w-full p-6">
        <h1 className="text-2xl font-bold mb-6">
          {editId ? "Edit Category" : "Create Category"}
        </h1>

        {/* Success/Error Messages */}
        {message && <p className="text-green-500">{message}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* Form */}
        <form onSubmit={saveCategory} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full lg:w-96 border border-gray-300 rounded-md p-2"
              placeholder="Enter category name"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            {editId ? "Update Category" : "Add Category"}
          </button>
        </form>

        {/* Categories Table */}
        <h2 className="text-xl font-bold mb-4">All Categories</h2>
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Category Name</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="px-6 py-3">{category.name}</td>
                <td className="px-6 py-3 flex gap-4">
                  <button
                    onClick={() => editCategory(category.id, category.name)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
