import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { fetchProducts } from "../lib/productsService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { BiLoaderAlt } from "react-icons/bi";
import Products from "../components/Products";
import ProductFilters from "../components/ProductFilters";
import { Outlet, useSearchParams } from "react-router-dom";

const Browse = () => {
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    limit: 100,
    skip: "",
    select: "",
    sortBy: "",
    order: "asc",
  });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 40_000 })
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get("q")
  const cat = searchParams.get("category")

  const {
    data: products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: async ({ pageParam = 0 }) =>
      await fetchProducts({ ...filters, skip: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const { skip, limit, total } = lastPage;
      const nextSkip = skip + limit;
      return nextSkip < total ? nextSkip : undefined;
    },
  });

  useEffect(() => {
    let timeoutId;

    const refetchProducts = (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= fullHeight - 100) {
          fetchNextPage();
        }
      }, 200);
    };

    document.addEventListener("scroll", refetchProducts);
    return () => {
      document.removeEventListener("scroll", refetchProducts);
      clearTimeout(timeoutId);
    };
  }, [fetchNextPage]);

  useEffect(() => {
    if(!products) return

    setFilteredProducts(products)
  }, [products])

  // useEffect(() => {
  //   const fil = products?.pages.map(page => {
  //       return  { ...page, products: page.products.filter(val => val.price > priceRange.min && val.price < priceRange.max) }
  //   })

  //   setFilteredProducts({ ...products, pages: fil })

  // }, [priceRange])

  // useEffect(() => {
  //   if(!query) return

  //   setFilters(prev => ({ ...prev, q: query }))
  // }, [query])

  useEffect(() => {
    setIsFilterPanelOpen(false)
  }, [filters])

  return (
    <div>
      <Nav value={query}/>
      <section className="px-[2rem] lg:px-[10rem] flex gap-6 pb-10 relative">
        <aside className={`w-full lg:w-75 fixed px-[2rem] bg-white z-10 top-15 bottom-0 lg:static transition-all duration-75 ${isFilterPanelOpen ? 'left-0' : 'left-full'}`}>
          <ProductFilters filters={filters} setFilters={setFilters} priceRange={priceRange} setPriceRange={setPriceRange} setIsFilterPanelOpen={setIsFilterPanelOpen} />
        </aside>
        <main className="flex-1">
          <Products products={filteredProducts} isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} setFilters={setFilters} setIsFilterPanelOpen={setIsFilterPanelOpen}/>
        </main>
      </section>
        <Outlet />
    </div>
  );
};

export default Browse;
