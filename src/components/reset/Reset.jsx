import React, { useState } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  //faLock,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

function Reset() {
  const divStyle = {
    backgroundColor: "#0d0d0d",
    backgroundImage: "linear-gradient(149deg, #0d0d0d 59%, #404040 83%)",
  };

 // const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState();
  //const [err, setErr] = useState();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const resetPass = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(email);
      /* history.push("/"); */
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex w-screen bg-zinc-100 text-white h-screen justify-center items-center m-auto ">
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
        <form>
          <div className="mb-6 mt-12 text-4xl font-bold  ">
            <label>Reset</label>
          </div>
          <div className="mb-6 mt-10 flex justify-center  ">
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
          {/* <p className="text-red-600 mb-2 ">{err && "Wrong credentials"}</p> */}

          <div className="mb-3 flex justify-center ">
            <input
              type="submit"
              className="p-2 w-64 outline-none rounded  text-primary bg-white font-bold hover:bg-tertiary hover:cursor-pointer hover:text-white "
              value="Send"
              onClick={resetPass}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reset;
