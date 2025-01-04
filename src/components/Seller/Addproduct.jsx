import React, { useState, useEffect } from "react";
import { HiUpload } from "react-icons/hi";
import axiosInstance from "../utils/axios";
import { Icon } from "@iconify/react";
import { Modal, Button, TextInput, Label, Select, Table } from "flowbite-react";
import axios from "axios";
export default function AddProduct() {
  const [categories, setCategories] = useState([]);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [Newcategory, setNewCategory] = useState([]);
  const categoryAPI="http://localhost:4800/api/categories";


  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(categoryAPI);
      setNewCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

 



   useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axiosInstance.get("/api/categories"),
          axiosInstance.get("/api/products/userproduct"),
        ]);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
 
  const handleDeleteProduct = async (productId) => {
    try {
      await axiosInstance.delete(`/api/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err.message);
    }
  };

  const handleViewProduct = (product) => {
    setCurrentProduct(product);
    setIsViewModalOpen(true);
  }; 


  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });

    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productResponse = await axiosInstance.post("/api/products", {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category_id: formData.category_id,
        is_new: formData.is_new,
        is_on_promotion: formData.is_on_promotion,
      });

      const productId = productResponse.data.id;

      if (formData.image) {
        const imageData = new FormData();
        imageData.append("image", formData.image);
        imageData.append("product_id", productId);

        await axiosInstance.post("/api/product-images", imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Product added successfully!");
      setFilePreview(null);

      const updatedProducts = await axiosInstance.get("/api/products/userproduct");
      setProducts(updatedProducts.data);

      setFormData({
        name: "",
        description: "",
        price: "",
        category_id: "",
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
 
  return (
   
        <div className="flex w-full p-4 mt-20">
          <div>
          <button
        onClick={() => setIsModalOpen(true)}
        className="text-xl mt-2 bg-green-400 rounded-md p-2 text-white pl-4 pr-4 hover:bg-green-800 transition-all"
      > New product</button>

{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 w-full">
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
                    {Newcategory.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}

                  </select>
                </div>

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
                      {filePreview && (
          <img
            src={filePreview}
            alt="Preview"
            className=" h-24 w-24 object-cover rounded mb-4"
          />
        )}
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
              <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2  mt-2 rounded hover:bg-gray-400"
                >
                <Icon icon="hugeicons:cancel-circle" width="24" height="24" />
                </button>
              <button
                type="submit"
                className="text-xl mt-2 bg-green-400 rounded-md p-2 text-white pl-4 pr-4 hover:bg-green-800 transition-all"
                disabled={isLoading}
              >
                {isLoading ? <Icon icon="line-md:loading-loop" width="24" height="24" /> : <Icon icon="ic:outline-save" width="24" height="24" />}
              </button>
              </div>
            </form>
            </div>
        </div>
      )}
            <div className="mt-10">
              <p className="text-xl font-bold">Products</p>
            </div>

<div className="overflow-x-auto">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr> 
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Price</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Images</th>
        <th className="px-4 py-2"></th>
      </tr>
    </thead>
   
    <tbody className="divide-y divide-gray-200">
    {products.map((product) => (
      <tr  key={product.id}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.name}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product.description}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product.price}Fwf</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700"> {product.images.length > 0 ? (
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
                        )}</td>
        <td className="whitespace-nowrap px-4 py-2">
        <button
                    color="light"
                    onClick={() => handleViewProduct(product)}
                  >
                   <Icon icon="carbon:view" width="24" height="24" />
                  </button>
          <button
                    color="failure"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                  <Icon icon="weui:delete-outlined" width="24" height="24" />
                  </button>
                  
        </td>
      </tr>

     
    ))}
     
    </tbody>
  </table>
</div>
          </div>
      {isViewModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
          <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2  mt-2 rounded hover:bg-gray-400"
                >
                <Icon icon="hugeicons:cancel-circle" width="24" height="24" />
                </button>

            <h2 className="text-xl font-bold">{currentProduct.name}</h2>
            <p>{currentProduct.description}</p>
            <p>Price: ${currentProduct.price}</p>
            <h3 className="text-lg font-semibold mt-4">Images</h3>
            <div className="flex space-x-2 mt-2">
              {currentProduct.images.map((image) => (
                
                <img
                  key={image.id}
                  src={`http://localhost:4800${image.url}`}
                  alt={currentProduct.name}
                  className="w-20 h-20 object-cover"
                />
              ))}
            </div>
        </div>
        </div>
      )}
        </div>
     
  );
}