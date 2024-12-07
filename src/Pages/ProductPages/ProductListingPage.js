import React, { useEffect, useState } from 'react';
import { useCatagoriesFilterContext } from '../../Context/CatagoriesFilterContext';
import FullCarCard from '../../Components/ItemCard/FullCarCard';
import Header from '../../Components/Header/Header';
import FilterControlBar from '../../Components/FIlterControl/FilterControlBar';
import { useProductDataContext } from '../../Context/ProductListingPageContext';
import { getProductData } from '../../Services/getProductData';
import { PiHandSwipeRightFill } from "react-icons/pi";

const ProductListingPage = () => {
  const { searchData } = useCatagoriesFilterContext();
  const { isLoading } = useProductDataContext();
  const { dispatch } = useProductDataContext();

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    // Manual data fetching when page reloads
    if (searchData.length === 0) getProductData(dispatch);
  }, [searchData.length]);

  // Handle touch gestures
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX); // Record starting X position
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX; // Record ending X position
    const swipeDistance = endX - startX;

    // Show filter if swipe distance is significant and from left to right
    if (swipeDistance > 50) {
      setIsFilterVisible(true);
    }
  };

  const closeFilterPanel = () => {
    setIsFilterVisible(false);
  };

  return (
    <div
      className="w-full min-h-screen relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Header />
      <div className="flex h-full">
        {/* Filter Sidebar for larger screens */}
        <div className="w-1/6 z-20 bg-slate-100 shadow-2xl min-h-screen hidden sm:block">
          <FilterControlBar />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-wrap w-full sm:w-5/6 justify-center px-4 mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="spinner">Loading...</div> {/* Placeholder for spinner */}
            </div>
          ) : searchData.length === 0 ? (
            <div className="flex justify-center items-center h-60">
              <h2>No Products Found</h2>
            </div>
          ) : (
            searchData.map((data) => <FullCarCard key={data.id} data={data} />)
          )}
        </div>
      </div>

      {/* Drag Indicator for smaller screens */}
      {!isFilterVisible && (
        <div
          className="fixed top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white py-2 px-3 rounded-r-lg shadow-lg flex items-center sm:hidden"
        >
          <PiHandSwipeRightFill size={24} className="mr-2" />
          
        </div>
      )}

      {/* Filter Control Bar for smaller screens */}
      {isFilterVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex">
          <div className="w-4/5 max-w-xs bg-slate-100 p-4 shadow-lg min-h-full">
            <FilterControlBar />
            <button
              className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
              onClick={closeFilterPanel}
            >
              Close
            </button>
          </div>
          {/* Clickable background area to close the filter */}
          <div
            className="flex-1"
            onClick={closeFilterPanel}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
