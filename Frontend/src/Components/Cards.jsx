import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/payment", { state: { book: item } });
  };

  return (
    <div className="my-4 px-2 flex-shrink-0">
      <div className="w-[250px] h-full bg-base-100 shadow-xl dark:bg-slate-900 dark:text-white border dark:border-gray-700 rounded-xl flex flex-col justify-between">
        {/* Image */}
        <figure className="overflow-hidden rounded-t-xl">
          <img
            src={item.image}
            alt={item.name}
            className="h-48 w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </figure>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-lg font-semibold flex justify-between items-center mb-1">
              {item.name}
              <span className="text-xs px-2 py-1 rounded bg-emerald-500 text-white">
                {item.category}
              </span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {item.title}
            </p>
          </div>

          {/* Price & Button */}
          <div className="flex justify-between items-center mt-auto">
            <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
              ${item.price}
            </span>
            <button
              onClick={handleBuyNow}
              className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
