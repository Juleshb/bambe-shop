import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import Nav from "./navs/Nav";
import Footer from "./navs/Footer";
import { CartContext } from "./CartContext";


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

  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to Checkout page
  };


  return (
    <>
      <Nav />

      <div className="mt-60 lg:mt-32 ml-10 overflow-auto pr-10 md:pl-0 md:pr-0">
        
      <div class="font-[sans-serif] bg-white">
      <div class="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div class="bg-[#2ac127] sm:h-screen sm:sticky sm:top-0 lg:min-w-[470px] sm:min-w-[300px] lg:h-[35rem] rounded-lg shadow-2xl ">
          <div class="relative h-full">
            <div class="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div class="space-y-4">

                
              {cart.map((item) => (
                
                <div    key={item.id} class="flex items-start gap-4">
                  <div class="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                  <img
                      src={
                        item.images && item.images.length > 0
                          ? `http://localhost:4800${item.images[0].url}`
                          : "placeholder-image-url"
                      }
                      className="w-16 md:w-32 max-w-full max-h-full"
                    />                  </div>
                  <div class="w-full">
                    <h3 class="text-white font-bold text-xl">  {item.name}</h3>
                    <ul class="text-xs text-white space-y-2 mt-2">
                      <li class="flex flex-wrap gap-4 text-lg border-b-2">Amount <span class="ml-auto">{item.quantity}</span></li>
                       <li class="flex flex-wrap gap-4 text-lg">Total Price <span class="ml-auto"> {item.price * item.quantity} RFW</span></li>
                    </ul>
                  </div>
                </div>

             
))}
               

             
              </div>
            </div>

            <div class="md:absolute md:left-0 md:bottom-0 bg-green-800 w-full p-4">
              <h4 class="flex flex-wrap gap-4 text-lg  text-white">Total <span class="ml-auto">   <p>{total} RFW</p>
              </span></h4>
            </div>
          </div>
        </div>

        <div class="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 class="text-2xl font-bold text-gray-800">Complete your order</h2>
          <form class="mt-8">
            <div>
              <h3 class="text-base text-gray-800 mb-4">Personal Details</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="First Name"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600" />
                </div>

                <div>
                  <input type="text" placeholder="Last Name"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600" />
                </div>

                <div>
                  <input type="email" placeholder="Email"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600" />
                </div>

                <div>
                  <input type="number" placeholder="Phone No."
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600" />
                </div>
              </div>
            </div>

            <div class="mt-8">
              <h3 class="text-base text-gray-800 mb-4">Shipping Address</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="Address Line"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600" />
                </div>
                <div>
                  <input type="text" placeholder="City"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600" />
                </div>
                <div>
                  <input type="text" placeholder="State"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600" />
                </div>
                <div>
                  <input type="text" placeholder="Zip Code"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-green-600" />
                </div>
              </div>

              <div class="flex gap-4 max-md:flex-col mt-8">
                <Link to="/Cart" class="rounded-md px-6 py-3 text-center w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1">Cancel</Link>
                <button type="button" class="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-green-600 hover:bg-green-700 text-white">Complete Purchase</button>
              </div>
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
