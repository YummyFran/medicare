import { useQuery } from "@tanstack/react-query";
import Select from "./Select";
import { getCategories } from "../lib/productsService";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { BiFilterAlt } from "react-icons/bi";

const sortBy = [
    { name: "Title"},
    { name: "Price"},
    { name: "Brand"},
    { name: "Rating"},
    { name: "Stock"}
]

const ProductFilters = ({ filters, setFilters, priceRange, setPriceRange,setIsFilterPanelOpen }) => {
    const setCategory = (category) => {
        setFilters(prev => ({...prev, category: category.toLowerCase().replace(" ", "-") }))
    }
    const setSortBy = (sort) => {
        setFilters(prev => ({...prev, sortBy: sort.toLowerCase()}))
    }
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => await getCategories()
    })
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold py-6">Filters</h2>
        <BiFilterAlt className="text-xl text-gray-400 cursor-pointer lg:hidden" onClick={() => setIsFilterPanelOpen(prev => !prev)}/>
      </div>
      <h3 className="text-md font-bold mb-4">Categories</h3>
      <Select setter={setCategory} options={categories} defaultOption={"All Categories"}/>
      <h3 className="text-md font-bold my-4">Sort by</h3>
      <Select setter={setSortBy} options={sortBy} defaultOption={"Default"}/>
      <h3 className="text-md font-bold my-4">Price range</h3>
      <RangeSlider 
        id="range-slider"
        min={0} 
        max={40_000} 
        defaultValue={[priceRange.min, priceRange.max]} 
        value={[priceRange.min, priceRange.max]}
        onInput={e => setPriceRange(prev => ({...prev, min: e[0], max: e[1]}))}
        ariaLabel={[priceRange.min, priceRange.max]}
      />
      <div className="py-4 flex items-center justify-end gap-2 w-full">
        <label htmlFor="from" className="text-sm">From</label>
        <input type="text" id="from" value={`$${priceRange.min}`} onChange={e => setPriceRange(prev => ({...prev, min: e.target.value.slice(1)}))} className="outline-none font-bold text-lg focus:border border-gray-500 rounded-lg text-center h-9 py-2 px-4 field-sizing-content" />
        <label htmlFor="to" className="text-sm">To</label>
        <input type="text" id="to" value={`$${priceRange.max}`} onChange={e => setPriceRange(prev => ({...prev, max: e.target.value.slice(1)}))} className="outliine-none font-bold text-lg focus:border border-gray-500 rounded-lg text-center h-9 py-2 px-4 field-sizing-content" />
      </div>
    </>
  );
};

export default ProductFilters;
