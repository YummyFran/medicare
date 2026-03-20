import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCategories } from '../lib/productsService'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const nav = useNavigate()

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => await getCategories()
    })

  return (
    <div className='px-[2rem] lg:px-[10rem] flex flex-col md:flex-row gap-4 justify-between pb-4'>
        <h2 className='font-bold text-2xl'>Shop by Catergory</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-4'>
            {
                categories?.slice(0, 8).map(category => (
                    <div onClick={() => nav(`/browse?category=${category.slug}`)} key={category.slug} className='h-min border border-gray-100 shadow-lg rounded-xl py-6 px-6 cursor-pointer hover:shadow-xl'>
                        {category.name}
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Categories