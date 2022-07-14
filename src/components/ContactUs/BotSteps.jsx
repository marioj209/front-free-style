// import React from "react";
// import ChatBot from "react-simple-chatbot";
// import { ThemeProvider } from 'styled-components'


// const theme = {
//     background: '#f5f8fb',
//     headerBgColor: '#0c0c0c',
//     headerFontColor: '#fff',
//     headerFontSize: '20px',
//     botBubbleColor: '#646363',
//     botFontColor: '#fff',
//     userBubbleColor: '#646363',
//     userFontColor: '#fff',
// }

// const steps=[
//   {
//     id: "1",
//     message: "Hola.  ¿Cuál es tu nombre?",
//     trigger: "2",
//   },

//   {
//     id: "2",
//     user: true,
//     validator: (value) => {
//       if (/^[A-Z]{1}[a-z]{2,15}$/.test(value)) {
//         return true;
//       } else {
//         return "Por favor introduce un nombre valido.";
//       }
//     },
//     trigger: "3"
//   },

//   {
//     id: "3",
    
//     message: "Hola {previousValue}, tienes alguna duda?",
//     trigger: "5"
//   },

//   // {
//   //   id: "4",
//   //   message: "¿Necesitas que te aclare alguna duda?",
//   //   trigger: "5"
//   // },

//   {
//     id: "5",
//     options: [
//       { value: "y", label: "Si", trigger: "6A" },
//       { value: "n", label: "No", trigger: "6B" },
//     ],
//   },

//   {
//     id: "6A",
//     message: "Genial, sobre que quieres saber?...",
//     trigger: "seleccion",
//   },

//   {
//     id: "6B",
//     message: "Espero haber aclarado sus dudas. Nos vemos",
//     end: true,
//   },
//   {
//     id: "seleccion",
//     options: [
//       { value: "a", label: "Compras", trigger: "7A" },
//       { value: "b", label: "Envios ", trigger: "7B" },
//     ],
//   },
//   {
//     id: "7A",
//     message:
//       "Oh, veo que tienes dudas con las compras, que informacion necesitas?",
//     trigger: "Compras",
//   },
//   {
//     id: "7B",
//     message:
//       "Oh, veo que tienes dudas con el envio, que informacion necesitas?",
//     trigger: "Envios",
//   },
//   {
//     id: "Compras",
//     options: [
//       { value: "tienda", label: "Tienda", trigger: "8A" },
//       { value: "pago", label: "Pago", trigger: "8B" },
//       { value: "registro", label: "Registro", trigger: "8C" },
//     ],
//   },
//   {
//     id: "Envios",
//     options: [
//       { value: "costo", label: "Costo", trigger: "9A" },
//       { value: "tiempo", label: "Tiempo estimado", trigger: "9B" },
//       { value: "cobertura", label: "Cobertura", trigger: "9C" },
//     ],
//   },
//   {
//     id: "8A",
//     message:
//       "Nuestra tienda es un ecommerce, especializado en indumentaria y accesorios",
//     trigger: "preguntaVuelta",
//   },

//   {
//     id: "8B",
//     message: "Se realiza mediante la pasarela de pago MercadoPago",
//     trigger: "preguntaVuelta",
//   },

//   {
//     id: "8C",
//     message:
//       "El registro se realiza llenando un formulario con los datos solicitados, luego debe iniciar sesion con los datos proporcionados",
//     trigger: "preguntaVuelta",
//   },
//   {
//     id: "9A",
//     message: "El costo de envio es totalmente gratis",
//     trigger: "preguntaVuelta",
//   },
//   {
//     id: "9B",
//     message: "El tiempo de entrega es de 2 a 3 dias habiles",
//     trigger: "preguntaVuelta",
//   },
//   {
//     id: "9C",
//     message: "los envios son a nivel nacional",
//     trigger: "preguntaVuelta",
//   },

//   {
//     id: "preguntaVuelta",
//     message: "Necesitas algo mas?",
//     trigger: "respuestaVuelta",
//   },
//   {
//     id: "respuestaVuelta",
//     options: [
//       { value: "y", label: "Si", trigger: "6A" },
//       { value: "n", label: "No", trigger: "6B" },
//     ],
//   },
// ]



// export default function BotSteps() {
//   return (
//     <div>
//       <ThemeProvider theme={theme}>
//       <ChatBot 
//       headerTitle='FreeStyle'
//        steps={steps}/>
//     </ThemeProvider>
//       </div>
//   );
// }