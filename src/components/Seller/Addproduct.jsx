import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { HiUpload } from "react-icons/hi";
import axiosInstance from "../utils/axios";

export default function AddProduct() {
  const [categories, setCategories] = useState(['']);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    is_new: false,
    is_on_promotion: false,
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch categories and products on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axiosInstance.get("/api/categories"),
          axiosInstance.get("/api/products"),
        ]);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []);

 
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add product API
      const productResponse = await axiosInstance.post("/api/products", {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category_id: formData.category_id,
        is_new: formData.is_new,
        is_on_promotion: formData.is_on_promotion,
      });

      const productId = productResponse.data.id;

      // Upload product image
      if (formData.image) {
        const imageData = new FormData();
        imageData.append("image", formData.image);
        imageData.append("product_id", productId);

        await axiosInstance.post("/api/product-images", imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Product added successfully!");

      // Fetch updated products list
      const updatedProducts = await axiosInstance.get("/api/products");
      setProducts(updatedProducts.data);

      // Clear form data after successful submission
      setFormData({
        name: "",
        description: "",
        price: "",
        category_id: "2",
        is_new: false,
        is_on_promotion: false,
        image: null,
      });
    } catch (err) {
      console.error("Error adding product:", err.message);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(categories)

  return (
    <div className="w-full flex">
      {/* Sidebar */}
      <div className="w-[30%]">
        <Sidebar />
      </div>

      <div className="w-full overscroll-auto">
        <div className="flex w-full mt-20">
          <div>
            <p className="mb-4 text-xl font-bold">Add Product</p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 w-full">
                {/* Product Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Apple iMac 27"'
                    className="block w-full mt-1 border border-green-500 p-2 pl-3"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="block w-full mt-1 border border-green-500 p-2 pl-3"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="$2300"
                    className="block w-full mt-1 border border-green-500 p-2 pl-3"
                    required
                  />
                </div>

                {/* Product Details */}
                <div className="lg:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Product details
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="e.g. 3.8GHz 8-core Intel Core i7 processor, Ram 16GB"
                    className="block w-full mt-1 border border-green-500 p-2 pl-3"
                    rows={4}
                    required
                  ></textarea>
                </div>

                {/* File Upload */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Product image
                  </label>
                  <div className="flex items-center justify-center">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600">Upload a file or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="text-xl mt-2 bg-green-400 rounded-md p-2 text-white pl-4 pr-4 hover:bg-green-800 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add product"}
              </button>
            </form>

            {/* Product Table */}
            <div className="mt-10">
              <p className="text-xl font-bold">Products</p>
              <table className="table-auto border-collapse w-full mt-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Images</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="border px-4 py-2">{product.name}</td>
                      <td className="border px-4 py-2">{product.description}</td>
                      <td className="border px-4 py-2">${product.price}</td>
                      <td className="border px-4 py-2">
                        {product.images.length > 0 ? (
                          <div className="flex space-x-2">
                            {product.images.map((image) => (
                              <img
                                key={image.id}
                                src={`http://localhost:4800${image.url}`}
                                alt={product.name}
                                className="w-16 h-16 object-cover"
                              />
                            ))}
                          </div>
                        ) : (
                          <span>No images</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
