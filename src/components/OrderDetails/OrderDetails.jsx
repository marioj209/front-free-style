import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetail } from "../Redux/action";
import { useEffect } from "react";
import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";

export default function OrderDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderDetail = useSelector((state) => state.orderDetail);

  useEffect(() => {
    dispatch(getOrderDetail(id));
  }, [dispatch, id]);

  
  //console.log(orderDetail[0]?.user.names, 'posicion 0')
  //console.log(orderDetail[0], 'posic0')


   const orderItems= orderDetail[0]?.orderItems?.map((e)=>e)
   //console.log(orderItems, 'items de la compra')

   let images = [];
   for (var i in orderItems) {
    images.push(orderItems[i].product.image[0]);
  }
  //console.log(images);

  let name = [];
   for (let i in orderItems) {
     name.push(orderItems[i].product.name);
   }
  // // console.log(name);

  let price = [];
  for (let i in orderItems) {
    price.push(orderItems[i].product.price);
  }
  // // console.log(price);

  let quantity = [];
  for (let i in orderItems) {
    quantity.push(orderItems[i].quantity);
  }
  // // console.log(quantity);

 
  let subtotal = [];
  for (let i in price) {
    subtotal.push(parseFloat(price[i] * quantity[i]));
  }

  return (
    <main className="radial px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-xl">
          <h1 className="text-sm font-semibold uppercase tracking-wide  text-gray-300">
            Gracias!
          </h1>
          <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl text-gray-300">
            ¡Está en camino!
          </p>
          <p className="mt-2 text-base text-gray-300 ">
            Tu orden <span className="font-bold">#{orderDetail[0]?.id}</span> se
            ha enviado y estará contigo pronto.
          </p>
        </div>

        <section
          aria-labelledby="order-heading"
          className="mt-10 border-2 border-gray-600 shadow-lg w-fit border rounded-md bg-gray-200"
        >
          <h2 id="order-heading" className="sr-only">
            Tu orden
          </h2>

          <h3 className="sr-only">Items</h3>
          <div className="py-10  flex  ">
            {images?.map((t) => {
              return (
                <div key={t.id} className="flex-wrap mx-20">
                  <img
                    src={t}
                    alt=""
                    className="img  object-center mt-6 rounded-lg sm:w-40 sm:h-40 "
                  />
                </div>
              );
            })}
          </div>

          <div className=" flex-row py-10  flex  items-center  min-w-fit">
            <div>
              <h2 className="mb-5 ml-20 font-bold text-base">Productos</h2>
              {name?.map((t) => {
                return (
                  <div key={t.id} className="flex-wrap mx-20">
                    <h2 className="font-semibold capitalize text-gray-600">
                      {t}
                    </h2>
                  </div>
                );
              })}
            </div>

            <div className="pl-4 my-auto flex flex-col sm:pl-6 ">
              <h2 className="mb-5 font-bold text-base">Precio</h2>
              {price?.map((t) => {
                return (
                  <div key={t.id}>
                    <h4 className="flex mr-4 font-semibold text-green-500">
                      $ {t}
                    </h4>
                  </div>
                );
              })}
            </div>

            <div className="pl-4 mx-auto flex flex-col sm:pl-6  ">
              <h2 className="mb-5 font-bold text-base"> Cantidad </h2>
              {quantity?.map((t) => {
                return (
                  <div key={t.id}>
                    <h4 className="flex ml-10 font-semibold text-gray-600">
                      x {t}
                    </h4>
                  </div>
                );
              })}
            </div>

            <div className="pl-4 mx-auto flex flex-col sm:pl-6">
              <h2 className="mb-5 font-bold text-base"> Subtotal </h2>
              {subtotal?.map((t) => {
                return (
                  <div key={t.id}>
                    <h4 className="flex ml-2 font-semibold text-green-500">
                      $ {t}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>

          <div className=" lg:ml-16 sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Tu información</h3>

            <h4 className="sr-only">Direccion</h4>
            <dl className="grid grid-cols-2 gap-x-6 text-md py-10">
              <div>
                <dt className="font-bold text-gray-900">Datos de envío</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block capitalize">
                      {orderDetail[0]?.user.names}{" "}
                      {orderDetail[0]?.user.lastNames}
                    </span>
                    {/* <span className="block">7363 Cynthia Pass</span> */}
                    <span className="block">Argentina</span>
                  </address>
                </dd>
              </div>
              <div>
                <h4 className="sr-only">Pago</h4>

                <div className="ml-32">
                  <dt className="font-bold text-gray-900 ">Métodos de pago</dt>
                  <dd className="mt-2 text-gray-700">
                    <p>Mercado Pago</p>
                    <p className="capitalize">{orderDetail[0]?.payment_type}</p>
                    <p>
                      <span aria-hidden="true">•••• </span>
                      <span className="sr-only">Ending in </span>0604
                    </p>
                  </dd>
                </div>
              </div>
            </dl>

            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 text-md pt-10 mr-28">
              <div className="flex justify-between">
                <dt className="font-bold text-lg  text-gray-900">Envío</dt>
                <dd className="font-semibold text-gray-700 mr-12">GRATIS</dd>
              </div>
              <div className="flex justify-between ">
                <dt className="font-bold text-lg text-gray-900">Total</dt>
                <dd className="text-green-500 text-xl font-bold mr-12 mb-4">
                  ${orderDetail[0]?.total}
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <Link to="/profile/history">
          <button className="button-primary mt-16 mx-96 w-32 p-3 duration-500">Salir</button>
        </Link>
      </div>
    </main>
  );
}