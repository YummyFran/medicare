import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../lib/productsService";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useCart } from "../providers/CartContext";
import { useProduct } from "../providers/ProductContext";

const ProductPage = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { product, clearProduct } = useProduct()
  const nav = useNavigate();

  const handleAddToCart = () => {
    addToCart(prev => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: quantity,
                subtotal: quantity * item.price,
              }
            : item
        )
      }

      return [
        ...prev,
        { ...product, quantity, subtotal: product.price * quantity },
      ]
    })

    nav(-1)
  }

  const handleClose = () => {
    // clearProduct()
    nav(-1)
  }

  return (
    <div className="fixed z-20 inset-0 top-15 flex justify-center items-center">
      <div
        className="bg-black absolute inset-0 opacity-20"
        onClick={handleClose}
      ></div>
      <div className="bg-white relative w-full h-full lg:h-[80vh] mx-0 lg:mx-[12rem] rounded-lg overflow-auto flex flex-col xl:flex-row shadow-lg">
        <div
          className="absolute top-0 right-0 text-2xl py-1 px-3 text-gray-500 cursor-pointer"
          onClick={handleClose}
        >
          &times;
        </div>

        <div className="h-full aspect-[7/9] bg-white grid grid-rows-[10fr_2fr] gap-4">
          <div className="h-full m-2 overflow-hidden rounded-lg">
            <img
              src={product?.images[activeImage]}
              alt={product?.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex gap-2 flex-nowrap overflow-auto px-2 pb-2">
            {product?.images.map((image, i) => (
              <div
                key={i}
                className={`aspect-square h-full bg-gray-300 p-2 rounded-md cursor-pointer ${
                  activeImage == i ? "border-gray-500 border-2" : ""
                }`}
                onClick={() => setActiveImage(i)}
              >
                <img src={image} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 py-8 px-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl text-gray-800">
              {product?.title}
            </h1>
            <div className="flex gap-2 items-center">
              <p className="text-lg text-gray-600 mr-2">{product?.brand}</p>
              {product?.tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-gray-200 text-xs text-gray-500 py-1 px-3 rounded-sm"
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              <span className="text-[0.7rem] mr-1">{product?.rating}</span>
              {product?.rating &&
                Array(Math.floor(product?.rating))
                  .fill("")
                  .map((_, i) => (
                    <IoIosStar className="fill-amber-400" key={i} />
                  ))}
              {product?.rating &&
                Array(Math.ceil(5 - product?.rating))
                  .fill("")
                  .map((_, i) => (
                    <IoIosStarOutline className="fill-amber-400" key={i} />
                  ))}
            </div>
          </div>
          <p className="text-md text-gray-700 line-clamp-3">{product?.description}</p>
          <p className="text-2xl font-bold text-gray-800">${product?.price}</p>
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-[8rem_1fr] gap-y-4">
              <span className="text-gray-600">Availability</span>
              <p
                className={`text-sm flex items-center ${
                  product?.stock <= 0 ? "text-red-500" : "text-gray-700"
                }`}
              >
                <span className="bg-gray-200 text-xs py-1 px-3 rounded-sm text-gray-500 mr-2">
                  {product?.availabilityStatus}
                </span>{" "}
                {product?.stock} items in stock
              </p>
              <span className="text-gray-600">Shipping</span>
              <p className="text-sm text-gray-700 flex items-center">
                {product?.shippingInformation}
              </p>
              <span className="text-gray-600">Warranty</span>
              <p className="text-sm text-gray-700 flex items-center">
                {product?.warrantyInformation}
              </p>
              <span className="text-gray-600">Return Policy</span>
              <p className="text-sm text-gray-700 flex items-center">
                {product?.returnPolicy}
              </p>
              <span className="text-gray-600">Quantity</span>
              <div className="flex">
                <button
                  className="border border-gray-500 px-3 h-8 flex justify-center items-center rounded-l-md cursor-pointer"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  value={product?.stock <= 0 ? 0 : quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value && Math.max(1, e.target.value))
                  }
                  className="border-y border-gray-500 field-sizing-content px-4 appearance-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  className="border border-gray-500 px-3 h-8 flex justify-center items-center rounded-r-md cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between md:justify-start">
            <button
              className="bg-gray-200 py-3 px-6 rounded-md flex justify-center items-center gap-2 text-gray-700 cursor-pointer hover:shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={product?.stock <= 0}
              onClick={() => handleAddToCart()}
            >
              {product?.stock > 0 ? (
                <>
                  <BsCartPlus />
                  Add to cart
                </>
              ) : (
                <>Out of stock</>
              )}
            </button>
            <button
              className="bg-[#76bad1] py-3 px-6 rounded-md flex justify-center items-center gap-2 text-white cursor-pointer hover:shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={product?.stock <= 0}
            >
              {product?.stock > 0 ? (
                <>
                  <MdOutlineShoppingCartCheckout />
                  Buy for ${(product?.price * quantity).toFixed(2)}
                </>
              ) : (
                <>Out of stock</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
