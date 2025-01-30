import React, { useState } from "react";
import { CartContext } from "../CartContext";
import { useCart } from "../CartContext";
function Nav() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
     <nav class="bg-[#38B496]  fixed w-full top-0 ">
     <div className="text-lg text-white w-full p-2 bg-[#38B496] text-center flex justify-center items-center">
          <p className="">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
        </div>
</nav>
    </>
  );
}

export default Nav;
