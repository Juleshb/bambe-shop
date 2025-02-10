import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import { useNavigate } from "react-router-dom"; 
import Nav from "./navs/Nav";
import Footer from "./navs/Footer";
import { CartContext } from "./CartContext";

function Cart() {
  const { t } = useTranslation(); // Initialize translation function
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate(); 

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
    navigate("/checkout"); 
  };

  return (
    <>
      <Nav />

      <div className="mt-60 lg:mt-32 ml-10 overflow-auto pr-10 md:pl-0 md:pr-0">
        <div className="relative overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left rtl:text-right text-green-500">
            <thead className="text-xs uppercase bg-[#38B496] text-white">
              <tr>
                <th scope="col" className="px-16 py-3">{t("image")}</th>
                <th scope="col" className="px-6 py-3">{t("product")}</th>
                <th scope="col" className="px-6 py-3">{t("quantity")}</th>
                <th scope="col" className="px-6 py-3">{t("price")}</th>
                <th scope="col" className="px-6 py-3">{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={item.id}
                  className="bg-[#38B496] border border-white mb-10 border-b hover:bg-[#4df170] text-white"
                >
                  <td className="p-4">
                    <img
                      src={
                        item.images && item.images.length > 0
                          ? `https://bambe.shop${item.images[0].url}`
                          : "placeholder-image-url"
                      }
                      className="w-16 md:w-32 max-w-full max-h-full"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">{item.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md"
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="px-2 py-1 bg-green-500 text-white rounded-md"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">
                    {item.price * item.quantity} RFW
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      {t("remove")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <input
              type="text"
              className="border-2 border-slate-300 p-2 rounded-md mt-20"
              placeholder={t("couponPlaceholder")}
            />
            <button className="bg-green-400 md:pl-4 md:pr-4 ml-3 rounded-sm text-sm p-3 text-white font-semibold">
              {t("applyCoupon")}
            </button>
          </div>

          <div className="border-2 border-slate-500 p-3 lg:w-96 mt-10">
            <p className="font-bold mb-2">{t("cartTotal")}</p>
            <div className="flex w-full justify-between border-b-2 border-slate-400 pb-2">
              <p>{t("subtotal")}:</p>
              <p>{total} RFW</p>
            </div>
            <div className="flex w-full justify-between border-b-2 border-slate-400 pb-2">
              <p>{t("shipping")}:</p>
              <p>{t("free")}</p>
            </div>
            <div className="flex w-full justify-between pb-2">
              <p>{t("total")}:</p>
              <p>{total} RFW</p>
            </div>
            <div className="flex justify-center items-center mt-5">
              <button
                className="bg-green-400 p-2 rounded-md text-white"
                onClick={handleCheckout}
              >
                {t("proceedToCheckout")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
