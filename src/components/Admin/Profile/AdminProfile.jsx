import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/AuthContext";
import { getUserByEmail } from "../../Redux/action";
import { useEffect } from "react";
import defaultImg from "../../../img/descarga (1).jpg";
import { Link, useParams } from "react-router-dom";
import LeftPanel from "../LeftPanel";

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.users);
  const { user } = useAuth();
  
  // console.log(userInfo.id, "todo esto es el usuario");

  useEffect(() => {
    if (user) {
      dispatch(getUserByEmail(user.email));
    }
  }, [dispatch, user]);

  //console.log(userInfo, "usuario db");
  const divStyle = {
    backgroundColor: "#0d0d0d",
    backgroundImage: "linear-gradient(149deg, #eeecec 59%, #404040 83%)",
  };

  return (
    <div className="flex relative bg-gray-300">
      <LeftPanel />

      <div className="relative h-screen flex overflow-hidden mx-auto">
        <div className="flex-1 min-w-0 flex flex-col overflow-y-hidden">
          <main className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col overflow-y-hidden xl:overflow-hidden">
              <div className="flex-1 flex xl:overflow-hidden">
                {/* Main content */}
                <div className="flex-1 max-h-screen xl:overflow-y-hidden">
                  <div
                    style={divStyle}
                    className="max-w-3xl shadow-xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-16 border rounded-md bg-white mt-12 mb-12 border-gray-400"
                  >
                    <h1 className="text-3xl font-extrabold text-blue-gray-900 text-center">
                      Mi cuenta
                    </h1>

                    <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200">
                      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                          <h2 className="text-xl font-medium text-blue-gray-900">
                            Perfil
                          </h2>
                          <p className="mt-1 text-sm text-blue-gray-500">
                            Esta información es confidencial, por lo que no
                            debera ser divulgada
                          </p>
                        </div>

                        <div className="w-36 ml-3">
                          {userInfo?.image ? (
                            <img
                              src={userInfo?.image}
                              readOnly
                              className="inline-block h-36 w-36 mt-4 rounded-full"
                              alt="img"
                            />
                          ) : (
                            <img
                              src={defaultImg}
                              readOnly
                              className="inline-block h-36 w-36 mt-4 rounded-full"
                              alt="default"
                            />
                          )}
                        </div>

                        <div className=" ml-20 mt-12 sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-blue-gray-900"
                          >
                            Nombre
                          </label>
                          <input
                            type="text"
                            name="names"
                            value={userInfo?.names || ""}
                            id="names"
                            readOnly
                            disabled={true}
                            className=" mt-1 bg-transparent font-bold text-primary block py-2 w-full rounded-md   sm:text-sm "
                          />
                        </div>

                        <div className="items-center ml-12 mt-12 sm:col-span-2">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-blue-gray-900"
                          >
                            Apellido
                          </label>
                          <input
                            type="text"
                            name="names"
                            id="last-name"
                            value={userInfo?.lastNames || ""}
                            disabled={true}
                            autoComplete="family-name"
                            className="mt-1 bg-transparent font-semibold block py-2 w-full border-blue-gray-300 rounded-md text-blue-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="sm:col-span-6">
                          <label
                            htmlFor="photo"
                            className="block text-sm font-semibold text-blue-gray-900 ml-16"
                          >
                            Avatar
                          </label>
                        </div>
                      </div>

                      <div className="pt-8 grid grid-cols-1 gap-y-10 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                          <h2 className="text-xl font-medium text-blue-gray-900">
                            Información personal
                          </h2>
                          <p className="mt-1 text-sm text-blue-gray-500">
                            Esta información es confidencial, por lo que no
                            debera ser divulgada
                          </p>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-blue-gray-900"
                          >
                            Cuenta de e-mail
                          </label>
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            value={userInfo?.email || ""}
                            autoComplete="email"
                            disabled={true}
                            className="mt-1 bg-transparent font-bold block py-2 w-full border-blue-gray-300 rounded-md text-blue-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone-number"
                            className="block text-sm font-medium text-blue-gray-900"
                          >
                            Número de Teléfono
                          </label>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={userInfo?.phone || ""}
                            disabled
                            autoComplete="tel"
                            className="mt-1 bg-transparent font-bold block py-2 w-full border-blue-gray-300 rounded-md text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-blue-gray-900"
                          >
                            Fecha de nacimiento
                          </label>
                          <input
                            type="text"
                            name="birthDate"
                            id="birthDate"
                            autoComplete="off"
                            value={userInfo?.birthDate || ""}
                            disabled
                            className="mt-1 font-bold bg-transparent block w-full py-2 border-blue-gray-300 rounded-md text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="pt-8 flex justify-end">
                        {/* <button
                          type="button"
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none"
                        >
                          Go back
                        </button> */}

                        <Link to={`/admin/profile/edit/${userInfo?.id}`}>
                          <button
                            type="submit"
                            className="ml-3 inline-flex justify-start py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none "
                          >
                            Editar
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
