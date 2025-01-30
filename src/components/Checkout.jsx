import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import Nav from "./navs/Nav";
import Footer from "./navs/Footer";
import { CartContext } from "./CartContext";
import axios from "axios";
function Checkout() {
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize navigation

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const [total, setTotal] = useState(calculateTotal());

  const incrementQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    setTotal(calculateTotal());
  };

  const decrementQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    setTotal(calculateTotal());
  };

  // Define state for user input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
 
  const handleCheckout = async () => {
    const orderData = cart.map((item) => ({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phone,
      address_line: address,
      city: city,
      state: state,
      zip_code: zip,
      product_id: item.id,
      product_name: item.name, // Include product name here
      quantity: item.quantity,
      price: Number(item.price).toFixed(2),
      total: (Number(item.price) * item.quantity).toFixed(2),
    }));
  
    const order = {
      customer_details: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phone,
        address_line: address,
        city: city,
        state: state,
        zip_code: zip,
      },
      order_items: orderData,
    };
  
    try {
      const response = await axios.post("https://bambe.shop/api/productorders", order, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        navigate("/Invoice", { state: { order } }); // Pass order data to Invoice
      } else {
        console.error("Error submitting order:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  
  

  return (
    <>
      <Nav />

      <div className="mt-60 lg:mt-32 ml-10 overflow-auto pr-10 md:pl-0 md:pr-0">
        <div className="font-[sans-serif] bg-white">
          <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
            <div className="bg-[#38B496] sm:h-screen sm:sticky sm:top-0 lg:min-w-[470px] sm:min-w-[300px] lg:h-[35rem] rounded-lg shadow-2xl ">
              <div className="relative h-full">
                <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-start gap-4">
                        <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                          <img
                            src={
                              item.images && item.images.length > 0
                                ? `https://bambe.shop${item.images[0].url}`
                                : "placeholder-image-url"
                            }
                            className="w-16 md:w-32 max-w-full max-h-full"
                          />
                        </div>
                        <div className="w-full">
                          <h3 className="text-white font-bold text-xl">
                            {item.name}
                          </h3>
                          <ul className="text-xs text-white space-y-2 mt-2">
                            <li className="flex flex-wrap gap-4 text-lg border-b-2">
                              Amount <span className="ml-auto">{item.quantity}</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-lg">
                              Total Price{" "}
                              <span className="ml-auto">
                                {item.price * item.quantity} RFW
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:absolute md:left-0 md:bottom-0 bg-green-800 w-full p-4">
                  <h4 className="flex flex-wrap gap-4 text-lg text-white">
                    Total{" "}
                    <span className="ml-auto">
                      <p>{total} RFW</p>
                    </span>
                  </h4>
                </div>
              </div>
            </div>

            <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
              <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
              <form className="mt-8">
                <div>
                  <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <input
                        type="number"
                        placeholder="Phone No."
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-base text-gray-800 mb-4">Shipping Address</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Address Line"
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="City"
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="State"
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                    <div>
                    <div>
  <input
    type="text"
    placeholder="Zip Code"
    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600"
    value={zip}
    onChange={(e) => setZip(e.target.value)}
  />
</div>

                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    className="bg-green-600 text-white py-3 px-4 w-full rounded-md"
                    onClick={handleCheckout}
                  >
                    Complete Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
