import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import logo from "../../img/logo.png";
export default function footer() {
  return (
    <div className="footer flex flex-col justify-between items-center mx-auto  dark:bg-black dark:text-white">
      <img src={logo} className="mx-auto mt-12 mb-20" alt="" />
      <h6 className="">©2022 Free Style. Todos los derechos reservados </h6>
    </div>
  );
}
