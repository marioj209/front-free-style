import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { userGoogleRegister } from "../Redux/action.js";
import { verification } from "../Redux/action.js";

import {
  faEnvelope,
  faLock,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const divStyle = {
    backgroundColor: "#0d0d0d",
    backgroundImage: "linear-gradient(149deg, #0d0d0d 59%, #404040 83%)",
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  let verifyEnabled = useSelector((state) => state.verifyUserEnabled.enabled);

  const [err, setErr] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...User, [name]: value });
  };

  const { login, loginWithGoogle, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(verification(User.email));

      if (verifyEnabled) {
        await login(User.email, User.password);

        navigate("/");
      }
    } catch (error) {
      setErr("Sucedio un error");
    }
  };

  const googleLogin = async () => {
    await loginWithGoogle();

    //navigate("/");
  };

  useEffect(() => {
    if (user) {
      const data = {
        email: user.email,
        names: user.displayName,
        lastNames: "Google",
        phone: "Google",
        birthDate: 1900 - 10 - 12,
      };
      dispatch(userGoogleRegister(data));
    }
  }, [user, dispatch]);

  return (
    <div className="flex w-screen bg-zinc-100 text-white h-screen justify-center items-center m-auto dark:bg-black dark:text-white ">
      <div
        style={divStyle}
        className="flex flex-col text-center h-3/4  w-2/5 rounded-md py-10 bg-primary  "
      >
        <Link to="/">
          <div className="bg-white w-12 p-1 ml-6 text-black hover:bg-tertiary hover:text-white rounded">
            <button>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 text-4xl font-bold  ">
            <label>Iniciar Sesión</label>
          </div>
          <div className="mb-8 text-md">
            <p>Bienvenido!</p>
          </div>
          <div className="mb-3 flex justify-center ">
            <div className="bg-tertiary w-6 rounded-l flex justify-center items-center  pl-3">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <input
              type="text"
              className="p-2 w-60 outline-none rounded-r text-sm  text-black font-bold placeholder:text-primary bg-tertiary placeholder:pl-2 "
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <p className="text-red-600 mb-2 ">{err && err}</p>
          <div className="mb-3 flex justify-center ">
            <div className="bg-tertiary w-6 rounded-l  flex justify-center items-center pl-3">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              type="password"
              className="p-2 w-60 outline-none rounded-r text-sm text-black font-bold placeholder:text-primary bg-tertiary placeholder:pl-2"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Link to="/reset">
              <p className="text-xs">Olvidaste tu contraseña?</p>
            </Link>
          </div>

          <div className="mb-6 mt-1">
            <Link to="/register">
              <p className="text-xs">Olvidaste de Registrarte? Hazlo aquí</p>
            </Link>
          </div>

          <div className="mb-3 flex justify-center ">
            <input
              type="submit"
              className="p-2 w-64 outline-none rounded  text-primary bg-white font-bold hover:bg-tertiary hover:cursor-pointer hover:text-white "
              value="Login"
            />
          </div>
        </form>
        <button onClick={googleLogin}>Iniciar sesión con Google</button>
      </div>
    </div>
  );
}

export default LoginForm;
