import React from "react";
import eslogan from "./imagenes/eslogan.png";
import linea from "./imagenes/lineadeportiva1.png";
import envios from "./imagenes/envios1.png";
import mujer from "./imagenes/mujer.png";
import hombre from "./imagenes/hombre.png";
import niños from "./imagenes/niños.png";
import unisex from "./imagenes/unisex.jpg";
import accesorios from "./imagenes/accesorios.png";
import testimonial1 from "./imagenes/testimoniales1.png";
import testimonial2 from "./imagenes/testimonial2.png";
import testimonial3 from "./imagenes/testimonial3.png";
import Footer from "../footer/Footer";
import NavBar from "../NavBar";
import "./Home.css";
import { Link } from "react-router-dom";
import TopSellers from "../topSeller/TopSellers";
import { useAuth } from "../../context/AuthContext";
import adiddas from "../../img/ardidas.png"
import nike from "../../img/naiki.png"
import fendi from "../../img/fendi.png"
import guess from "../../img/guess.png"
import boss from "../../img/Boss.png"
import calvin from "../../img/Calvin.png"

export default function Home() {
  //const { user } = useAuth();

  /* console.log(user); */
  return (
    <div className="background">
      <NavBar />
      <div className="slider">
        <ul>
          <li>
            <img src={eslogan} alt="eslogan" />
          </li>
          <li>
            <img src={linea} alt="linea" />
          </li>
          <li>
            <img src={envios} alt="envios" />
          </li>
        </ul>
      </div>
      <div className="all">
        <h4 className="names">Hombres</h4>
        <h4 className="names">Mujeres</h4>
        <h4 className="names">Niños</h4>
        <h4 className="names">Sin género</h4>
        <img src={hombre} alt="hombre" />
        <img src={mujer} alt="mujer" />
        <img src={niños} alt="niños" />
        <img
          className="w-[20rem] h-[22.8rem] ml-8 "
          src={unisex}
          alt="sin género"
        />

        <button className="boton">
          <Link to="/products/men">Ver más</Link>
        </button>
        <button className="boton">
          <Link to="/products/women">Ver más</Link>
        </button>
        <button className="boton">
          <Link to="/products/kids">Ver más</Link>
        </button>
        <button className="boton">
          <Link to="/products/no-gender">Ver más</Link>
        </button>
      </div>

      <h4 className="Top font-semibold mt-[10rem] text-center">
        Productos más vendidos
      </h4>

      <TopSellers />

      <h2 className="opinions mt-[10rem]">Marcas Asociadas </h2>
      <h3 className="under-text">
        Las marcas de vanguardia las encontras aquí{" "}
      </h3>

      <div className="bg-gray-[#f3f3f3]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="img mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img className="max-h-32" src={adiddas} alt="Workcation" />
            </div>
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img className="max-h-36" src={nike} alt="Mirage" />
            </div>
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img className="max-h-28" src={guess} alt="StaticKit" />
            </div>
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img className="max-h-24 m" src={calvin} alt="Laravel" />
            </div>
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img className="max-h-24" src={boss} alt="Tuple" />
            </div>
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img className="max-h-20" src={fendi} alt="Statamic" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
