import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postMercadoPago} from "../Redux/action";
// import { Link } from "react-router-dom";
import accounting from "accounting";
import logo from "../../img/mercadopago_off.png";
import Swal from "sweetalert2";

function CheckoutPaymentMp({formData}) {
  const dispatch = useDispatch();
  const mp = useSelector((state) => state.linkmp);

  const orderSummaryTotal = localStorage.getItem("cart");
  const [productItem, setproductItem] = useState(JSON.parse(orderSummaryTotal));

  const LocalStorageCheckOut = JSON.parse(localStorage.getItem("cart"));
  // console.log(LocalStorageCheckOut, "LocalStorageCheckout");

  let total = 0;
  

  if (orderSummaryTotal) {
    for (let i = 0; i < productItem.length; i++) {
      total += productItem[i].quantity * parseFloat(productItem[i].price);
      //  console.log(product[i].price,subTotal,'ESTE ES EL SUBTOTAL DENTRO DEL FOR')
      
    }
  }



  function handleClick(e) {
    e.preventDefault();
    if(formData === null){
      // alert('agrega los datos del form')
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor complete el formulario antes',
      })
    }else{

      dispatch(
        postMercadoPago({
          product: LocalStorageCheckOut,
          user: "neubigin0@4shared.com",
        })
      );
      // console.log(LocalStorageCheckOut, "LocalStorageCheckOut");
    }
  }

  // console.log(mp)

  return (
    
    <div className=" items-center sm:grid-cols sm:gap-x-4">
    <div className="mt-12 ml-12 flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-primary dark:text-white">2</div>

      <div className="bg-white border-4  border-gray-300/100 rounded-xl m-8 pb-4 mt-10 lg:max-w-xl">
        <h1 className="text-3xl m-2 text-center mt-6">Total a Pagar</h1>

        <h2 className="my-6 ml-5 mr-5 border-t-2 border-gray-500">
          <p className="text-center font-bold text-4xl mt-5 ml-5 text-green-500">
            {accounting.formatMoney(total, "AR$ ", 3)}
          </p>
        </h2>

        {/* Boton confirmar compra */}
        <div className=" border-gray-200 mb-4 px-4 sm:px-6">
          <button
            onClick={handleClick}
            type="submit"
            className="w-full bg-primary border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary"
          >
            Confirmar Pedido
          </button>
        </div>
      </div>


     <div className="flex ml-12 items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-primary dark:text-white">3</div>
      <div className=" w-full bg-white border-4 border-gray-300/100 rounded-xl m-8 pb-4 mt-4 lg:max-w-xl h-72">
        
      <h2 className="text-3xl text-primary text-center mt-6">Formas de Pago</h2>
      <h2 className="my-6 ml-5 mr-5 border-t-2 border-gray-500"></h2>
        <img src={logo} alt="" className="w-64 m-auto " />
        <div className="text-center">
          <a
            href={mp.init_point}
            className="  border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-bold text-black hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Click Aquí!
          </a>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPaymentMp;
