import React, { useState } from 'react'
import { IoSearchOutline, IoCartOutline  } from "react-icons/io5";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../providers/CartContext';


const Nav = ({ value }) => {
    const [search, setSearch] = useState(value)
    const { cart } = useCart()
    const nav = useNavigate()

    const handleSearch = e => {
        e.preventDefault()

        nav('/browse?q=' + search)
    }
  return (
    <div className='flex justify-between items-center px-[2rem] lg:px-[10rem] py-3 gap-2 lg:gap-12 sticky top-0 h-15 bg-white z-30'>
        <div className='font-bold text-xl cursor-pointer' onClick={() => nav('/')}>
            <span>MediCare</span>
            <span className='font-normal ml-2'>Pharmacy</span>
        </div>
        <div className="flex-1 border border-gray-500 rounded flex items-center pl-2 gap-2 bg-gray-50">
            <IoSearchOutline className='text-gray-500'/>
            <form action={"/browse"} className='w-full' onSubmit={handleSearch}>
                <input className='py-2 pr-4 outline-0 w-full text-md' value={search || ""} onChange={e => setSearch(e.target.value)} type="text" name="q" id="search" placeholder='What are you looking for?'/>
            </form>
        </div>
        <div className='cart text-2xl relative cursor-pointer' onClick={() => nav('/cart')}>
            <IoCartOutline />
            {
                cart?.length > 0 &&
                <div className='absolute text-[0.6rem] top-0 right-0 bg-red-400 h-4 aspect-square rounded-full flex justify-center items-center text-white font-bold translate-x-[50%] translate-y-[-50%]'>{cart?.length}</div>
            }
        </div>
    </div>
  )
}

export default Nav