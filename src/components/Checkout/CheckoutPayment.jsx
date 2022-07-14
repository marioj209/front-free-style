// import React from "react";
// import CheckoutPaymentMp from "./CheckoutPaymentMp";



// const paymentMethods = [
//   { id: "credit-card", title: "Credit card" },
//   { id: "paypal", title: "PayPal" },
//   { id: "MercadoPago", title: "MercadoPago" },
// ];
// function CheckoutPayment() {
//   return (
//     <div>
//       <div className="border-gray-300 pt-10">
//         <h2 className="text-lg font-bold text-primary dark:text-white">Payment</h2>

//         <fieldset className="mt-4">
//           <legend className="sr-only">Payment type</legend>
//           <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10 ">
//             {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
//               <div key={paymentMethod.id} className="flex items-center">
//                 {paymentMethodIdx === 0 ? (
//                   <input
//                     id={paymentMethod.id}
//                     name="payment-type"
//                     type="radio"
//                     defaultChecked
//                     className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 "
//                   />
//                 ) : (
//                   <input
//                     id={paymentMethod.id}
//                     name="payment-type"
//                     type="radio"
//                     className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
//                   />
//                 )}

//                 <label
//                   htmlFor={paymentMethod.id}
//                   className="ml-3 block text-sm font-medium text-gray-700 dark:text-white"
//                 >
//                   {paymentMethod.title}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </fieldset>

//         <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
//           <div className="col-span-4">
//             <label
//               htmlFor="card-number"
//               className="block text-md font-medium text-primary dark:text-white"
//             >
//               Card number
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 id="card-number"
//                 name="card-number"
//                 autoComplete="cc-number"
//                 className="block w-full py-3 border-gray-300 rounded-md drop-shadow-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div className="col-span-4">
//             <label
//               htmlFor="name-on-card"
//               className="block text-md font-medium text-primary dark:text-white"
//             >
//               Name on card
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 id="name-on-card"
//                 name="name-on-card"
//                 autoComplete="cc-name"
//                 className="block w-full py-3 border-gray-300 rounded-md drop-shadow-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div className="col-span-3">
//             <label
//               htmlFor="expiration-date"
//               className="block text-md font-medium text-primary dark:text-white"
//             >
//               Expiration date (MM/YY)
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="expiration-date"
//                 id="expiration-date"
//                 autoComplete="cc-exp"
//                 className="block w-full py-3 border-gray-300 rounded-md drop-shadow-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="cvc"
//               className="block text-md font-medium text-primary dark:text-white"
//             >
//               CVC
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="cvc"
//                 id="cvc"
//                 autoComplete="csc"
//                 className="block w-full py-3 border-gray-300 rounded-md drop-shadow-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>
//         </div>
//         <div className=" border-gray-200 py-6 px-4 sm:px-6">
//              <button
//                type="submit"
//                className="w-full bg-primary border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary"
//              >
//                Confirm order
//              </button>
             

//            </div>
//       </div>
//     </div>
//   );
// }

// export default CheckoutPayment;
