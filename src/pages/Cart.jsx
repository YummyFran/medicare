import React, { useState } from 'react'
import Nav from '../components/Nav'
import Stepper from '../components/Stepper'
import CartItems from '../components/CartItems'
import CheckoutDetails from '../components/CheckoutDetails'
import { FaRegCircleCheck } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const [step, setStep] = useState(1)
    const [summary, setSummary] = useState({
      isOpen: false,
      items: []
    })
    const nav = useNavigate()

  return (
    <div className='min-h-screen flex flex-col'>
        <Nav />
        <Stepper step={step} />

        {
          summary?.isOpen && 
          <div className='fixed z-20 inset-0 flex justify-center items-center'>
            <div
              className="bg-black absolute inset-0 opacity-20"
              onClick={() => setSummary(prev => ({ ...prev, isOpen: false}))}
            ></div>
            <div className='bg-white relative w-full h-full top-15 lg:top-0 lg:h-[80vh] mx-0 lg:mx-[12rem] px-[2rem] rounded-lg overflow-hidden flex flex-col items-center shadow-lg p-4'>
              <FaRegCircleCheck className='text-[10rem] mt-6 text-green-500' />
              <h2 className='font-bold text-2xl text-center py-4'>Order Successfull</h2>
              <p>You order #{Math.ceil(Math.random() * (999_999 - 100_000)) + 100_000} has been placed succesfully</p>
              <div className='flex flex-col gap-2 py-4 w-100'>
              {
                summary?.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-gray-500">
                    <p className="text-md">
                      {item.quantity} x {item.title}
                    </p>
                    <p className="text-lg">${item.subtotal.toFixed(2)}</p>
                  </div>
                ))
              }
              <button className='bg-gray-800 text-white py-2 rounded-md my-4' onClick={() => nav('/browse')}>Browse</button>
              </div>
            </div>
          </div>
        }
        
        <main className='grid grid-cols-1 lg:grid-cols-[6fr_3fr] gap-6 flex-1 mx-[2rem] lg:mx-[10rem] pb-[5rem]'>
            <div className=''>
              <CartItems />
            </div>
            <div className=''>
              <CheckoutDetails setSummary={setSummary}/>
            </div>
        </main>
    </div>
  )
}

export default Cart