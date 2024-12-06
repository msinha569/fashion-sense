import React, { useEffect } from 'react';
import { useCatagoriesFilterContext } from '../../Context/CatagoriesFilterContext';
import FullCarCard from '../../Components/ItemCard/FullCarCard';
import Header from '../../Components/Header/Header';
import FilterControlBar from '../../Components/FIlterControl/FilterControlBar';
import { useProductDataContext } from '../../Context/ProductListingPageContext';
import { getProductData } from '../../Services/getProductData';
import { Link } from 'react-router-dom';

const ProductListingPage = () => {
  const { searchData } = useCatagoriesFilterContext();
  const { isLoading } = useProductDataContext();
  const {dispatch} = useProductDataContext()

  useEffect(() => {           // manual data fetching when data is not available, use case - when page is reloaded on product listing page
    if (searchData.length===0)
       getProductData(dispatch)
  }, [])

  return (
    <div className='w-full min-h-screen'>
      <Header />
      <div className='flex h-full'>
        <div className='w-1/6 bg-slate-100 shadow-2xl min-h-screen'>
          <FilterControlBar />
        </div>
        <div className='flex flex-wrap w-5/6 justify-between px-4 mt-4'>
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="spinner">Loading...</div> {/* Placeholder for spinner */}
            </div>
          ) : searchData.length === 0 ? (
            <div className="flex justify-center items-center h-60">
              <h2>No Products Found</h2>
            </div>
          ) : (
            searchData.map((data) => (
                  <FullCarCard key={data.id} data={data} />
             
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
