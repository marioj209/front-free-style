import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserByEmail, reset } from "../Redux/action";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import defaultImg from "../../img/descarga (1).jpg";
import Swal from "sweetalert2";

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const {names, lastNames, birthDate, phone, image} = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.user.users);
  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    if (user) {
      dispatch(getUserByEmail(user.email));
    }
  }, [dispatch, user, id]);

  console.log(userInfo, "usuario db");

  function backOnClicke(e) {
    e.preventDefault();
    dispatch(reset());
    navigate("/profile");
  }

  const validate = Yup.object({
    names: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastNames: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    birthDate: Yup.string()
      .required("Required")
      .test("DOB", "Choose a valid date of birth", (value) => {
        return moment().diff(moment(value), "years") >= 18;
      }),
    phone: Yup.string().matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
  });

  const divStyle = {
    backgroundColor: "#0d0d0d",
    backgroundImage: "linear-gradient(149deg, #eeecec 59%, #404040 83%)",
  };

  return (
    <Formik
      initialValues={{
        names: userInfo?.names,
        lastNames: userInfo?.lastNames,
        birthDate: userInfo?.birthDate,
        phone: userInfo?.phone,
        image: userInfo?.image,
      }}
      enableReinitialize={true}
      validationSchema={validate}
      onSubmit={async (values) => {
        console.log(values, "valores");
        await axios
          .put(`http://localhost:3001/profile/${id}`, values)
          .then((response) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Profile edited successfully",
              showConfirmButton: false,
              timer: 2000,
            });
            navigate("/profile");
          });
      }}
    >
      {/* <div> */}
      {({ formik, values, handleSubmit, handleChange }) => (
        <div className="relative h-screen flex bg-blue-gray-50 overflow-hidden">
          <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
            <main className="flex-1 flex overflow-hidden">
              <div className="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
                <div className="flex-1 flex xl:overflow-hidden">
                  {/* Main content */}
                  <div className="flex-1 max-h-screen xl:overflow-y-auto">
                    <div
                      style={divStyle}
                      className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-16 border rounded-md bg-white mt-12 mb-12 border-gray-500"
                    >
                      <h1 className="text-3xl font-extrabold text-blue-gray-900 text-center">
                        Mi cuenta
                      </h1>

                      <Form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-8 divide-y divide-y-blue-gray-200"
                      >
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                          <div className="sm:col-span-6">
                            <h2 className="text-xl font-medium text-blue-gray-900">
                              Editar perfil
                            </h2>
                            <p className="mt-1 text-sm text-blue-gray-500">
                              Esta información es confidencial, por lo que no
                              debera ser divulgada
                            </p>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-blue-gray-900"
                            >
                              Nombre
                            </label>
                            <Field
                              type="text"
                              name="names"
                              id="names"
                              autoComplete="off"
                              value={values.names || ""}
                              onChange={handleChange}
                              className="mt-1 block py-2  w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />

                            <ErrorMessage
                              component="div"
                              name="names"
                              className="text-red-700"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="last-name"
                              className="block text-sm font-medium text-blue-gray-900"
                            >
                              Apellido
                            </label>
                            <Field
                              type="text"
                              name="lastNames"
                              id="lastNames"
                              autoComplete="family-name"
                              value={values.lastNames || ""}
                              onChange={handleChange}
                              className="mt-1 block py-2 w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ErrorMessage
                              component="div"
                              name="lastNames"
                              className="text-red-700"
                            />
                          </div>

                          <div className="sm:col-span-6">
                            <label
                              htmlFor="photo"
                              className="block text-sm font-medium text-blue-gray-900"
                            >
                              Foto
                            </label>
                            <div className="mt-1 flex items-center">
                              <div>
                                {values.image ? (
                                  <img
                                    src={values?.image}
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

                              <div className="ml-4 flex">
                                {/* <div className="relative bg-white py-2 px-3 border border-blue-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-blue-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500">
                                  <label
                                    htmlFor="user-photo"
                                    className="relative text-sm font-medium text-blue-gray-900 pointer-events-none"
                                  >
                                    <span>Change</span>
                                    <span className="sr-only"> user photo</span>
                                  </label>
                                  <input
                                    id="user-photo"
                                    name="user-photo"
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                  />
                                </div> */}
                                {/* <button
                                  type="button"
                                  className="ml-3 bg-transparent py-2 px-3 border border-transparent rounded-md text-sm font-medium text-blue-gray-900 hover:text-blue-gray-700 focus:outline-none focus:border-blue-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-gray-50 focus:ring-blue-500"
                                >
                                  Remove
                                </button> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
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
                            <Field
                              type="text"
                              name="email"
                              id="email"
                              autoComplete="email"
                              value={user?.email || ""}
                              disabled={true}
                              readOnly
                              className="mt-1 bg-gray-300 block py-2 w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone-number"
                              className="block text-sm font-medium text-blue-gray-900"
                            >
                              Número de Teléfono
                            </label>
                            <Field
                              type="text"
                              name="phone"
                              id="phone"
                              autoComplete="tel"
                              value={values.phone || ""}
                              onChange={handleChange}
                              className="mt-1 block py-2 w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ErrorMessage
                              component="div"
                              name="email"
                              className="text-red-700"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-blue-gray-900"
                            >
                              Fecha de nacimiento
                            </label>
                            <Field
                              type="text"
                              name="birthDate"
                              id="birthDate"
                              autoComplete="off"
                              value={values.birthDate || ""}
                              onChange={handleChange}
                              className="mt-1 block w-full py-2 border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ErrorMessage
                              component="div"
                              name="birthDate"
                              className="text-red-700"
                            />
                          </div>

                          {/* <p className="text-sm text-blue-gray-500 sm:col-span-6">
                            This account was created on{" "}
                            <time dateTime="2017-01-05T20:35:40">
                              January 5, 2017, 8:35:40 PM
                            </time>
                            .
                          </p> */}
                        </div>

                        <div className="pt-8 flex justify-end">
                          <button
                            onClick={(e) => backOnClicke(e)}
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Cancelar
                          </button>

                          <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Guardar
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </Formik>
  );
}
