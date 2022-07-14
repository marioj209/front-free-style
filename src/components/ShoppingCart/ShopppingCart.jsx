import React from 'react'
import Carts from './Carts'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar';




function ShoppingCart() {
  return (
    <div>
      <NavBar />
      <h1 className="text-4xl font-semibold m-7 mt-14">Carrito de Compras</h1>
      <div className="grid gap-2 grid-cols-2 ml-10">
        <Carts />

        <Link to="/products">
          <button
            className="bg-black w-32 h-12 rounded-lg shadow-lg border-2 border-gray-600 ml-5 mt-5 text-white hover:bg-gray-700 duration-500"
            
          >
            Volver
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ShoppingCart