import React from "react";
import logo from "../../img/logo.png"
import "./LeftPanel.css"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from '@mui/icons-material/Person';
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

import EqualizerSharpIcon from "@mui/icons-material/EqualizerSharp";

import StorefrontSharpIcon from "@mui/icons-material/StorefrontSharp";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { useNavigate,Link } from 'react-router-dom';

function LeftPanel() {
  const navigate = useNavigate();

  function handleProducts(e) {
    e.preventDefault()
    const name = e.target.name
    switch (name) {
      case 'dash':
        navigate("/admin")
        break
      case 'user':
        navigate("/admin/user")
        break
      case 'ord':
        navigate("/admin/order")
        break
      case 'stats':
        navigate("/admin/stats")
        break
      case 'profile':
        navigate('/admin/profile')
        break
      case 'log':
        navigate('/products')
        break
      case 'prod':
        navigate('/admin/products')
        break
      default:
        navigate('/products')
        break

    }
  }
  return (
    <div className="box-content w-56">
      <Link to="/products">
        <div>
          <img className="bg-black w-56 p-4" src={logo} alt="Pic not found" />
        </div>
      </Link>
      <div className="flex-1 w-56 bg-gray-800 h-screen ">
        <ul className="flex flex-col space-y-8 my-auto ml-1">
          <div>
            <h1 className="h1 text-gray-400 mt-2">Principal</h1>
            <li className="ml-2 pt-2 font-semibold text-white">
              <DashboardIcon />
              <button name="dash" onClick={(e) => handleProducts(e)}>
                Principal
              </button>
            </li>
          </div>
          <div>
            <h1 className="h1 text-gray-400">Lista</h1>
            <li className="ml-2 pt-2 font-semibold text-white">
              <PeopleRoundedIcon />
              <button name="user" onClick={(e) => handleProducts(e)}>
                Usuarios
              </button>
            </li>
            <li className="ml-2 pt-2 font-semibold text-white">
              <StorefrontSharpIcon />
              <button name="prod" onClick={(e) => handleProducts(e)}>
                Productos
              </button>
            </li>
            <li className="ml-2 pt-2 font-semibold text-white">
              <CreditCardRoundedIcon />
              <button name="ord" onClick={(e) => handleProducts(e)}>
                Ordenes
              </button>
            </li>
          </div>
          <div>
            <h1 className="h1 text-gray-400">Utilidades</h1>
            <li className="ml-2 pt-2 font-semibold text-white">
              <EqualizerSharpIcon />
              <button name="stats" onClick={(e) => handleProducts(e)}>
                Estadísticas
              </button>
            </li>
          </div>

          <div className="">
            <h1 className="h1 text-gray-400">Usuario</h1>
            <li className="ml-2 pt-2 font-semibold text-white">
              <PersonIcon />
              <button name="profile" onClick={(e) => handleProducts(e)}>
                Perfiles
              </button>
            </li>
            <li className="ml-2 pt-2 font-semibold text-white">
              <ExitToAppRoundedIcon />
              <button name="log" onClick={(e) => handleProducts(e)}>
                Salir
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default LeftPanel;
