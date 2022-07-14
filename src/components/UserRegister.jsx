import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext.js";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import UserRegisterSelect from "./UserRegisterSelect";
const { REACT_APP_BACKEND_URL } = process.env;

const options = [
  { value: "male", label: "Masculino" },
  { value: "female", label: "Femenino" },
  { value: "i prefer not to say", label: "Prefiero no decirlo" },
];

export const UserRegister = () => {
  const navigate = useNavigate();

  const { signup, logout } = useAuth();

  const validate = Yup.object({
    names: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastNames: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 charaters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
    email: Yup.string().email("Invalid email").required("Required"),
    // phone: Yup.string().matches(

    //   /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,

    //   /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,

    //   /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,

    //   "Phone number is not valid"
    // ),
    birthDate: Yup.string()
      .required("Required")
      .test("DOB", "Choose a valid date of birth", (value) => {
        return moment().diff(moment(value), "years") >= 18;
      }),
  });

  const divStyle = {
    backgroundColor: "#0d0d0d",
    backgroundImage: "linear-gradient(149deg, #0d0d0d 59%, #404040 83%)",
  };

  return (
    <Formik
      initialValues={{
        names: "",
        lastNames: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        birthDate: "",
        genre: "female",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        console.log(values);

        try {
          await signup(values.email, values.password);
          await logout();
          axios
            .post(`${REACT_APP_BACKEND_URL}/users`, values)
            .then((response) => {
              console.log("Data added successfully.");
              Swal.fire({
                // position: 'center',
                // icon: 'success',
                title: "Usuario Creado Exitosamente",
                showConfirmButton: false,
                timer: 2000,
              });
              navigate("/login");
            });
        } catch (error) {
          Swal.fire({
            // position: 'center',
            // icon: 'success',
            title: "El email ya existe",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }}
    >
      {(formik) => (
        <div className="flex w-screen bg-zinc-100 text-white h-fit justify-center items-center m-auto ">
          <div
            style={divStyle}
            className="flex flex-col text-center h-fit w-2/5 rounded-md py-10 bg-primary  "
          >
            {/* Boton de regreso */}
            <Link to="/">
              <div className="bg-white w-12 p-1 ml-6 text-black hover:bg-tertiary hover:text-white rounded">
                <button>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
              </div>
            </Link>

            <div className="mb-6 text-4xl font-bold">
              <label>Registrate</label>
            </div>
            <div className="mb-8 text-md">
              <p>Bienvenido!</p>
            </div>

            <Form className=" m-auto pr-4 flex flex-wrap md:justify-center sm:justify-center gap-2 ">
              <TextField
                label="Nombre"
                name="names"
                type="text"
                placeholder="John"
              />

              <TextField
                label="Apellido"
                name="lastNames"
                type="text"
                placeholder="Doe"
              />

              <TextField
                label="Contraseña"
                name="password"
                type="password"
                placeholder="**"
              />

              <TextField
                label="Confirmar contraseña"
                name="confirmPassword"
                type="password"
                placeholder="**"
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                placeholder="john@dev.com"
              />

              <TextField
                label="Teléfono"
                name="phone"
                type="text"
                placeholder="1145879293"
              />

              <TextField
                label="Fecha de nacimiento"
                name="birthDate"
                type="text"
                placeholder="yyyy-mm-dd"
              />

              <div className="mb-3 mt-4 flex justify-center">
                <UserRegisterSelect
                  options={options}
                  value={formik.values.genre}
                  //className={'input'}
                  className="p-2 ml-5 w-60 outline-none rounded text-sm  text-black font-bold  placeholder:text-slate-500 "
                  onChange={(value) =>
                    formik.setFieldValue("genre", value.value)
                  }
                />
              </div>

              <div className="mt-8 ml-2 flex flex-row justify-center space-x-4 ">
                <button
                  className="p-2 w-64 outline-none rounded  text-primary bg-white font-bold hover:bg-tertiary hover:cursor-pointer hover:text-white"
                  type="submit"
                >
                  Registro
                </button>

                <button
                  className="p-2 w-64 outline-none rounded  text-primary bg-white font-bold hover:bg-tertiary hover:cursor-pointer hover:text-white"
                  type="reset"
                >
                  Limpiar campos
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};
