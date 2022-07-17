import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faShoppingCart,
  faUser,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../img/logo.png";
import { useAuth } from "../context/AuthContext.js";
import { useDispatch, useSelector } from "react-redux";
import { userType } from "./Redux/action";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useDarkMode from "./darkMode";

function NavBar() {
  const { user, logout } = useAuth();
  const dispatch = useDispatch();
  const userT = useSelector((state) => state.verify);
  const [colorTheme, setTheme] = useDarkMode();
  console.log(colorTheme);
  const handleLogout = async () => {
    await logout();
  };
  useEffect(() => {
    if (user) {
      dispatch(userType(user.email));
    }
  }, [dispatch, user]);

  let welcome = user ? "Hola, " + user.email.split("@")[0] : "Hola";

  return (
    <div className="bg-primary text-tertiary py-4 flex justify-around  ">
      <Link to="/">
        <div>
          <img src={logo} alt="logo" className="h-7 w-20 " />
        </div>
      </Link>

      <div>{welcome}</div>
      <Link to="/cart">
        <div className="hover:text-white">
          <FontAwesomeIcon icon={faShoppingCart} /> Carro
        </div>
      </Link>
      {/* Boton Login */}

      {user &&
        (userT.isAdmin === false ? (
          <Link to="/profile/favorites">
            <button className="mb-4">
              <FavoriteIcon />
            </button>
          </Link>
        ) : null)}

      {user &&
        (userT.isAdmin === true ? (
          <Link to="/admin">
            <div className=" px-3 rounded py-1.5 w-30 hover:text-white ">
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              Perfil
            </div>
          </Link>
        ) : (
          <Link to="/profile">
            <div className=" px-3 rounded py-1.5 w-30 hover:text-white ">
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              Perfil
            </div>
          </Link>
        ))}

      <div
        className=" px-3  py-1.5 w-30  cursor-pointer"
        onClick={() => setTheme(colorTheme)}
      >
        {colorTheme === "light" ? (
          <FontAwesomeIcon icon={faSun} className="mr-3" />
        ) : (
          <FontAwesomeIcon icon={faMoon} className="mr-3" />
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-secondary px-3 rounded py-1.5 hover:text-white "
      >
        {user ? "Cerrar sesión" : <Link to="/login">Iniciar sesión</Link>}
      </button>
    </div>
  );
}

export default NavBar;
