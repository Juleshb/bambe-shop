import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { Icon } from "@iconify/react";
 export default function Order() {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axiosInstance.get("/api/categories"),
          axiosInstance.get("/api/productorders")
        ]);
         setProducts(productsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []);
  

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

 

  return (
    <div className="flex w-full p-4 h-auto ">
      <div>
        <div className="mt-10">
          <p className="text-xl font-bold">Customer Orders</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Customer Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Location
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Product
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Description
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Images
                </th>
               </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {product.last_name}
                  </td> 
                  <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                    {product.city}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                    {product.name}
                  </td>
                 
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.price}Fwf
                  </td>

                  <td>
                    <img
                    src={`http://localhost:4800${product.image_url}`}
                    alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>

                  <td className="whitespace-nowrap px-4 hidden py-2">
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
                      <Icon
                        icon="weui:delete-outlined"
                        width="24"
                        height="24"
                      />
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
