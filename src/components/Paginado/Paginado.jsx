import React from "react";

export default function Paginado({ productPerPage, Products, paginado, currentPage }) {
  const pageNumbers = [];

  
  for (let i = 1; i <= Math.ceil(Products / productPerPage); i++) {
    pageNumbers.push(i);
  }
  const last=pageNumbers[pageNumbers.length-1]
  
  return (
    <nav>
      <ul className="flex justify-center ">
        <li>
          {currentPage!==1? <button
          onClick={() => paginado(currentPage>1?currentPage-1:currentPage)}
          className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-gray-800 rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >Ant.</button>:null}
        </li>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <li key={number}>
                <button
                  
                  className="mx-1 py-2 px-3 leading-tight text-gray-500 bg-gray-800 border border-black-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
                  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-500
                  focus:outline-none focus:ring focus:ring-gray-800"
                  onClick={() => paginado(number)}
                >
                  {number}
                </button>
              </li>
            );
          })}
        <li>
          {currentPage!==last?<button
             onClick={(e) => paginado(currentPage<last?currentPage+1:currentPage)}
            className="py-2 px-3 leading-tight text-gray-500 bg-gray-800 rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Sig.
          </button>:null}
        </li>
      </ul>
    </nav>
  );
}
