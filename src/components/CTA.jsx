import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <div className='px-[2rem] lg:px-[10rem] py-2 bg-[#236d5c] mt-8 h-100 flex justify-center items-center'>
        <Link to={'/browse'} className='bg-white py-4 px-6 rounded-md shadow-lg text-[#236d5c]'>Browse Products</Link>
    </div>
  )
}

export default CTA