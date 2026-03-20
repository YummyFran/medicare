import React from 'react'

const Footer = () => {
  return (
    <div className='px-[2rem] lg:px-[10rem] py-10 flex justify-between'>
        <div className='font-bold text-4xl flex-1'>Medicare Pharmacy</div>

        <div className="flex flex-1 justify-around">
            <div className='flex flex-col gap-2'>
                <h6 className='font-bold'>Menu</h6>
                <p>Link</p>
                <p>Link</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h6 className='font-bold'>Menu</h6>
                <p>Link</p>
                <p>Link</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h6 className='font-bold'>Menu</h6>
                <p>Link</p>
                <p>Link</p>
                <p>Link</p>
            </div>
        </div>
    </div>
  )
}

export default Footer