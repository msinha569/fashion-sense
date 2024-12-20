import React from 'react'
import { useFilterContext } from '../../Context/FilterContext'

const FilterControlBar = () => {
    const {state, dispatch} =useFilterContext()
  return (
    <div>
      <div className="p-4 border rounded-lg bg-white w-64">
    {/* Sort by Price */}
    <div className="mb-4">
        <h2 className="font-semibold mb-2">Short by Price</h2>
        <div>
        <label className="flex items-center mb-2">
            <input
            type="radio"
            name="priceSort"
            className="mr-2 accent-blue-500"
            onClick = {() =>
                 dispatch({type: "SORT", payload:false})}
            />
            High to Low
            
        </label>
        <label className="flex items-center">
            <input
            type="radio"
            name="priceSort"
            className="mr-2 accent-blue-500"
            onClick = {() => 
                dispatch({type: "SORT", payload:true})}
            />
            Low to High
        </label>
        </div>
    </div>

    {/* Price Range */}
    <div className="mb-4">
        <h2 className="font-semibold mb-2">Price Range</h2>
        <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
    </div>

    {/* Rating */}
    <div className="mb-4">
        <h2 className="font-semibold mb-2">Rating</h2>
        <div className="flex">
        {/* Stars - Replace with icon or SVG */}
        {[...Array(5)].map((_, i) => (
            <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-yellow-500 cursor-pointer"
            onClick={() => dispatch({type: "RATING", payload: i+1})}
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 17.27l5.18 3.03-1.64-5.34L20.5 10l-5.47-.39L12 4.5 9.97 9.61 4.5 10l4.96 4.96-1.64 5.34L12 17.27z"
            />
            </svg>
        ))}
        </div>
    </div>


    {/* Clear Filters Button */}
    <button className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold">
        Clear Filters
    </button>
    </div>

    </div>
  )
}

export default FilterControlBar
