import React from 'react';
import Footer from './navs/Footer';
import Nav from './navs/Nav';
import { useLocation } from 'react-router-dom';

function Invoice() {
  const location = useLocation();
  const { order } = location.state || {}; // Retrieve order data from state

  if (!order) {
    return <p>No order data available.</p>;
  }

  const { customer_details, order_items } = order;

  console.log(order_items);

  return (
    <>
      <Nav />
      <div className="bg-white rounded-lg mt-20 shadow-lg px-8 py-10 w-1/2 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="text-gray-700 font-semibold text-lg">Bambe Group</div>
          </div>
          <div className="text-gray-700">
            <div className="font-bold text-xl mb-2">INVOICE</div>
            <div className="text-sm">Date: {new Date().toLocaleDateString()}</div>
            <div className="text-sm">Invoice #: INV12345</div>
          </div>
        </div>
        <div className="border-b-2 border-gray-300 pb-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2">
            {customer_details.first_name} {customer_details.last_name}
          </div>
          <div className="text-gray-700 mb-2">{customer_details.address_line}</div>
          <div className="text-gray-700 mb-2">
            {customer_details.city}, {customer_details.state} {customer_details.zip_code}
          </div>
          <div className="text-gray-700">{customer_details.email}</div>
        </div>
        <table className="w-full text-left mb-8">
          <thead>
            <tr>
              <th className="text-gray-700 font-bold uppercase py-2">Product</th>
              <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
              <th className="text-gray-700 font-bold uppercase py-2">Price</th>
              <th className="text-gray-700 font-bold uppercase py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order_items.map((item, index) => (
              <tr key={index}>
                <td className="py-4 text-gray-700">{item.product_name}</td>
                <td className="py-4 text-gray-700">{item.quantity}</td>
                <td className="py-4 text-gray-700">{item.price} RFW</td>
                <td className="py-4 text-gray-700">{item.total} RFW</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="text-gray-700 mr-2">Total:</div>
          <div className="text-gray-700 font-bold text-xl">
            {order_items
              .reduce((acc, item) => acc + parseFloat(item.total), 0)
              .toFixed(2)}{' '}
            RFW
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Invoice;
