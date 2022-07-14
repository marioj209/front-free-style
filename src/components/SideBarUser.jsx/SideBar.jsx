import React from "react";
import {useNavigate} from 'react-router-dom'
import logo from "../../img/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CallIcon from "@mui/icons-material/Call";
import {Link } from "react-router-dom";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

function SideBar() {
  const navigate = useNavigate();

  function handleNavigate(e) {
    e.preventDefault();
    const name = e.target.name;
    switch (name) {
      case "pro":
        navigate("/profile");
        break;
      case "fav":
        navigate("/profile/favorites");
        break;
      case "his":
        navigate("/profile/history");
        break;
      case 'contact':
        navigate('/profile/contact')
        break
      default:
        navigate("/products");
        break;
    }
  }
  return (
    <>
      <div className="abosolute w-56">
        <div>
          <Link to="/products">
            <img className="bg-black w-56 p-4" src={logo} alt="Pic not found" />
          </Link>
        </div>
        <div className="flex-1 w-56 bg-gray-800 h-screen">
          <ul className="text-white font-semibold ml-2">
            <li className="pt-8">
              <AccountCircleIcon />{" "}
              <button name="pro" onClick={(e) => handleNavigate(e)}>
                Perfil
              </button>
            </li>
            <li className="pt-8">
              <FavoriteIcon />{" "}
              <button name="fav" onClick={(e) => handleNavigate(e)}>
                Favoritos
              </button>
            </li>
            <li className="pt-8 ">
              <LibraryBooksIcon />{" "}
              <button name="his" onClick={(e) => handleNavigate(e)}>
                Historial
              </button>
            </li>
            <li className="pt-8">
              <CallIcon />{" "}
              <button name="contact" onClick={(e) => handleNavigate(e)}>
                Contactanos
              </button>
            </li>
              <li className=" pt-8 font-semibold text-white">
                <ExitToAppRoundedIcon /> 
                <button name="log" onClick={(e) => handleNavigate(e)}>
                  Salir
                </button>
              </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
