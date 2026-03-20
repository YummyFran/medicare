import React from 'react'
import { IoIosStar } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../providers/ProductContext';

const ProductCard = ({ product, className }) => {
    const nav = useNavigate()
    const { setProduct } = useProduct()

    const handleClick = () => {
        setProduct(product)

        nav(`${product.id}`)
    }

  return (
    <div className={`shadow-lg rounded-lg basis-50 ${className} grow-1 h-full flex flex-col cursor-pointer`} onClick={handleClick}>
        <div className='bg-gray-200 rounded-lg h-60 aspect-square relative'>
            <img src={product?.thumbnail} alt={product?.name} className='h-full w-full object-cover'/>
            <div className='absolute top-2 left-2 flex gap-1 items-center text-sm border border-amber-400 bg-amber-100 py-1 px-2 rounded-md'>
                <IoIosStar className='fill-amber-400'/>
                <span className='text-[0.7rem]'>{product?.rating}</span>
            </div>
        </div>
        <div className='py-4 flex flex-col gap-2 px-4 flex-1'>
            <p className='text-md font-normal truncate'>{product?.title}</p>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                {
                    product ? 
                        <>
                            <p className='text-xl font-bold'>₱{product?.price}</p>
                            <p className={`text-xs ${product?.stock > 0 ? '' : 'text-red-500'}`}>{product?.stock} items left</p>
                        </>
                    : 
                        <>
                            <p className='bg-gray-200 w-30 h-5'></p>
                            <p className='bg-gray-200 w-20 h-5'></p>
                        </>
                }
            </div>
            <div className='flex justify-between items-center gap-4'>
                <p className='text-xs text-gray-500 truncate'>{product?.shippingInformation}</p>
                <p className={`text-xs text-nowrap ${product?.stock > 0 ? 'text-gray-500' : 'text-red-500'}`}>{product?.availabilityStatus}</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard