import React from 'react'
import accounting from 'accounting';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Counter({ product }) {
  const navigate=useNavigate()
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
  };
  let subTotal=0;
  const localCounter = localStorage.getItem('cart')
  const localCartCounter = localCounter !== null && JSON.parse(localCounter)
  if (localCartCounter) {
    // console.log(localCartCounter,'ESTE ES EL LOCALCARTCOUNTER')
    for (let i = 0; i < product.length;i++ ) {
      subTotal += (product[i].quantity * parseFloat(product[i].price))
      // console.log(product.name,subTotal,'ESTE ES EL SUBTOTAL DENTRO DEL FOR')
    }
  }
  function handleCheckOut() {
    if (user?.email) {
      navigate("/checkout")
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes estar Logeado!",
        html: `<a href="/login">Tienes que estar logeado para continuar!Click aquí</a>`,
        footer: `<a href="/register">Sin registrarse aun!Por favor click aquí </a>`,
      });
    }
  }
  
  // console.log(subTotal,'ESTE ES EL SUBTOTAL')
  return (
    <div className="rounded-2xl bg-white box-border w-9/12 h-auto mx-auto pb-8 shadow-2xl ">
      <div className="bg-white border-2 border-gray-300/100 rounded-xl m-8 pb-4 ">
        <h1 className="text-3xl m-2 ">Total a Pagar</h1>
        <h2 className="my-10 ml-5 ">
          SubTotal{" "}
          <p className="text-xl mt-5 ml-5">
            {accounting.formatMoney(subTotal, "$ ", 3)}
          </p>
        </h2>
        <h2 className="my-10 ml-5 ">
          Envío:{" "}
          <p className="text-green-600 mt-5 ml-5 font-bold">Envío Gratis</p>
        </h2>
        <h2 className="my-10 ml-5 mr-5 border-t-2 border-gray-500">
          Total
          <p className="text-xl mt-5 ml-5">
            {accounting.formatMoney(subTotal, "$ ", 3)}
          </p>
        </h2>
      </div>

      <div className="flex justify-center">
        <button
          onClick={()=>handleCheckOut()}
          className="button-primary mx-8 text-lg  box-border w-96 py-3"
        >
          Comprar Ahora
        </button>
      </div>
    </div>
  );
}

export default Counter