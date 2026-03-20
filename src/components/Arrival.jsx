import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getRandomProducts } from '../lib/productsService'
import ProductCard from './ProductCard'

const Arrival = () => {

    const { data: arrivals } = useQuery({
        queryKey: ['arrivals'],
        queryFn: async () => await getRandomProducts()
    })

    if(!arrivals) return
  return (
    <div className='px-[2rem] lg:px-[10rem] py-2'>
        <h2 className='font-bold text-2xl pb-4'>Featured Products</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
            {
                arrivals ? 
                    arrivals?.map(product => (
                        <ProductCard product={product} key={product.id} className={'flex-1'}/>
                    ))
                :
                    Array(4).fill('').map((_, i)=> (
                        <ProductCard key={i} />
                    ))
            }
        </div>
    </div>
  )
}

export default Arrival