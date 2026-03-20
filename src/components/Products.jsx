import React from "react";
import ProductCard from "./ProductCard";
import { BiSortAlt2, BiFilterAlt  } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import Loading from "./Loading";


const Products = ({ products, isLoading, isFetchingNextPage, setFilters, setIsFilterPanelOpen }) => {
    const toggleOrder = () => {
        setFilters(prev => ({ ...prev, order: prev.order == "asc" ? "desc" : "asc" }))
    }
    if(isLoading) return <Loading />
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold py-6">Browse Products</h2>
        <div className="flex items-center gap-2">
            <BiSortAlt2 className="text-xl text-gray-400 cursor-pointer" onClick={toggleOrder}/>
            <BiFilterAlt  className="text-xl text-gray-400 cursor-pointer" onClick={() => setIsFilterPanelOpen(prev => !prev)}/>
        </div>
      </div>
      <div
        className="grid gap-6 
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-2
                xl:grid-cols-3
                2xl:grid-cols-4"
      >
        {products?.pages?.flatMap((page) =>
          page.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        )}
      </div>
      {isFetchingNextPage && <Loading />}
    </>
  );
};

export default Products;
