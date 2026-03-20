import React, { useEffect, useState } from "react";
import { useCart } from "../providers/CartContext";

const DISCOUNT = 50
const GIFT_CODE = "MASTERJOMS"

const CheckoutDetails = ({ setSummary }) => {
  const [giftCode, setGiftCode] = useState("");
  const [giftCodeStatus, setGiftCodeStatus] = useState("");
  const { cart, selected, addToCart, setSelected } = useCart();
  const selectedSet = new Set(selected);

  const totalAmount = cart.filter((item) => 
    selectedSet.has(item.id)
  ).reduce((acc, val) => acc += val.subtotal, 0)

  const calculatedAmount = totalAmount - (giftCodeStatus == "valid" ? DISCOUNT : 0)

  const handleCheckout = () => {
    setSelected([])
    addToCart(prev => prev.filter(item => !selected.includes(item.id)))
    setSummary({
        isOpen: true,
        items: cart.filter((item) => selectedSet.has(item.id))
    })
  }

  useEffect(() => {
    if (!giftCode) {
      setGiftCodeStatus("");
      return;
    }

    setGiftCodeStatus("checking");

    const handler = setTimeout(() => {
      simulateVerifyCode(giftCode).then((isValid) => {
        setGiftCodeStatus(isValid ? "valid" : "invalid");
      });
    }, 500);

    return () => clearTimeout(handler);

    async function simulateVerifyCode(code) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(code === GIFT_CODE);
        }, 800);
      });
    }
  }, [giftCode]);
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold py-2 text-lg text-gray-800">Gift Code</p>
      <div className="w-full relative">
        <input
          type="text"
          value={giftCode}
          onChange={(e) => setGiftCode(e.target.value)}
          placeholder={`Enter gift code e.g. ${GIFT_CODE}`}
          className="border py-2 px-4 border-gray-400 rounded-md text-gray-800 caret-gray-400 w-full"
        />
        <p
          className={`absolute top-[50%] right-3 translate-y-[-50%] ${
            giftCodeStatus == "valid"
              ? "text-green-500"
              : giftCodeStatus == "invalid"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {giftCodeStatus}
        </p>
      </div>
      <p className="font-bold py-2 text-lg text-gray-800">Checkout Details</p>
      <p className="text-gray-600">
        {selected?.length > 0 ? selected?.length : "No"}{" "}
        {selected?.length == 1 ? "item" : "items"} selected
      </p>
      {cart
        .filter((item) => selectedSet.has(item.id))
        .map((item) => (
          <div key={item.id} className="flex justify-between items-center text-gray-500">
            <p className="text-md">
              {item.quantity} x {item.title}
            </p>
            <p className="text-lg">₱{item.subtotal.toFixed(2)}</p>
          </div>
        ))}
      {giftCodeStatus == "valid" && selected?.length > 0 && (
        <div className="flex justify-between items-center text-gray-500">
          <p className="text-md">Gift code discount</p>
          <p className="text-lg text-green-500">-₱{DISCOUNT}</p>
        </div>
      )}
      {
        selected?.length > 0 &&
        <>
            <div className="flex justify-between items-center text-gray-500">
                <p className="text-md">Delivery Charges</p>
                <p className="text-md">Free delivery</p>
            </div>
            <hr className="m-2"/>
            <div className="flex justify-between items-center text-gray-500">
                <p className="text-md font-bold">Total Amount</p>
                <p className="text-lg font-bold">₱{(Math.max(calculatedAmount, 0)).toFixed(2)}</p>
            </div>
            <button onClick={() => handleCheckout()} className="bg-gray-800 text-white py-2 rounded-md cursor-pointer hover:bg-gray-700 mt-4">Checkout</button>
        </>
      }
    </div>
  );
};

export default CheckoutDetails;
