import React, { useState } from "react";
import { useCart } from "../providers/CartContext";
import CartItem from "./CartItem";
import { IoCheckmark } from "react-icons/io5";

const CartItems = () => {
  const { cart, clearCart, selected, setSelected } = useCart();

  const toggleSelectAll = () => {
    setSelected(selected?.length > 0 ? [] : cart?.map((item) => item.id));
  };

  return (
    <div>
      <div>
        <div className="flex py-2 gap-2 items-center">
          <div
            className={`w-5 h-5 border border-gray-500 rounded-sm grid place-items-center cursor-pointer ${
              selected?.length > 0 && selected?.length == cart?.length
                ? "bg-gray-800 text-white text-sm"
                : ""
            }`}
            onClick={() => toggleSelectAll()}
          >
            {selected?.length > 0 && selected?.length == cart?.length && <IoCheckmark />}
          </div>
          <p onClick={() => toggleSelectAll()}>
            {selected.length}/{cart?.length} Items selected
          </p>
          <button
            className="ml-auto text-gray-700 font-bold text-xs px-2 cursor-pointer hover:underline"
            onClick={() => clearCart()}
          >
            Clear Cart
          </button>
        </div>

        <div className="flex flex-col px-4 border border-gray-300 rounded-lg">
          {cart?.length > 0 ? 
            cart?.map((item) => (
                <CartItem
                item={item}
                key={item.id}
                selected={selected}
                setSelected={setSelected}
                />
            ))
            :
            <p className="text-center py-6 text-gray-500">No items in cart yet</p>
        }
        </div>
      </div>
    </div>
  );
};

export default CartItems;
