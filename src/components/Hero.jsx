import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  const nav = useNavigate()
  return (
    <div className='px-[2rem] py-4 lg:px-[10rem] h-[calc(100vh_-_60px)]'>
        <div className="h-[90%] rounded-lg overflow-hidden relative flex gap-4">
          <div className='flex-1 flex flex-col justify-center gap-2'>
            <h1 className='font-extrabold text-4xl text-gray-800'>Welcome to MediCare Pharmacy</h1>
            <p className='font-normal text-lg text-gray-800'>Your trusted online store for health and wellness. <br /> Quality medicines and healthcare products delivered to your door.</p>
            <button className='bg-[#236d5c] text-white py-3 px-6 self-start rounded-md mt-4 shadow-lg cursor-pointer' onClick={() => nav('/browse')}>Shop now</button>
          </div>
          <div className='flex-1'>
            <img src="/assets/hero.png" alt="hero" className='w-full h-full object-cover object-center'/>
          </div>

            {/* <div className='absolute bg-black inset-0 opacity-25'></div>
            <div className="absolute text-white top-[50%] right-10 lg:right-20 translate-y-[-50%] flex flex-col">
                <div className='text-6xl lg:text-[5rem] font-mono text-right'>Simple is More</div>
                <Link to={'/browse'} className='hover:underline self-end flex gap-2 items-center'>Browse products <FaArrowRightLong /></Link>
            </div> */}
        </div>
    </div>
  )
}

export default Hero