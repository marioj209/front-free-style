import React from "react";
import { getCategories, getBrand, createProduct } from "../../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LeftPanel from "../LeftPanel";
import Swal from "sweetalert2";

export default function FormProduct() {
  const allBrand = useSelector((state) => state.brand);
  const allCategories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    image: [],
    description: "",
    genre: [],
    brandId: 0,
    categoryId: 0,
    price: 0,
  });

  const genre = [
    { value: "men", name: "Hombre" },
    { value: "women", name: "Mujer" },
    { value: "kids", name: "Niño" },
    { value: "no-gender", name: "Sin género" },
  ];

  const validate = (dataObject) => {
    const errors = [];

    if (!dataObject.name) {
      errors.push(input.name);
    }

    if (!dataObject.description) {
      errors.push(input.description);
    }

    if (!dataObject.genre) {
      errors.push(input.genre);
    }

    if (!dataObject.brandId) {
      errors.push(input.brandId);
    }

    if (!dataObject.categoryId) {
      errors.push(input.categoryId);
    }

    if (!dataObject.price) {
      errors.push(input.price);
    }
    return errors;
  };

  //VALIDACIONES
  function handleSubmit(e) {
    e.preventDefault();
    if (validate(input).length > 0) {
      return alert("Llene todos los campos");
    }

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("genre", input.genre);
    formData.append("brandId", input.brandId);
    formData.append("categoryId", input.categoryId);
    formData.append("price", input.price);
    for (let i = 0; i < input.image.length; i++) {
      formData.append("image", input.image[i]);
    }
    dispatch(createProduct(formData));
    alert("¡Product created!");
    setInput({
      name: "",
      image: [],
      description: "",
      genre: [],
      brandId: [],
      categoryId: "",
      price: 0,
      stock: 0,
    });
  }

  function handleChange(e) {
    if (e.target.name === "image") {
      setInput({
        ...input,

        [e.target.name]: e.target.files,
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  }
  console.log(input, "input");

  function handleCheck(e) {
    e.preventDefault();
    // console.log(e, "eeeee")
    setInput({
      ...input,
      genre: e.target.name,
    });
  }

  function handleSelectCat(e) {
    setInput({
      ...input,
      categoryId: e.target.value,
    });
  }
  function handleSelectBrand(e) {
    setInput({
      ...input,
      brandId: e.target.value,
    });
  }

  useEffect(() => {
    dispatch(getCategories({ genre: undefined }));
    dispatch(getBrand({ genre: undefined }));
  }, []);

  return (
    <div className="flex bg-gray-300 h-full relative">
      <div className="relative ">
        <LeftPanel />
      </div>
      <div className="bg-gray-200 w-screen h-screen my-12 mx-16 shadow-xl px-4 py-5 sm:rounded-lg sm:p-6 border-2 border-gray-400">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-semibold leading-6 text-gray-900">
              Crear Producto
            </h2>
          </div>
          <NavLink to="/admin/products">
            <button className=" border-2 bgflex bg-gray-600 p-2 w-24 rounded-lg text-white hover:bg-gray-800 transition duration-500 ease-in-out shadow-xl border-gray-300">
              Atras
            </button>
          </NavLink>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form
              encType="multipart/form-data"
              className="space-y-3"
              action="#"
              method="POST"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="col-span-3 sm:col-span-2">
                <label className="font-bold text-lg">Nombre:</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="Nombre del Producto"
                    type="text"
                    // placeholder='Name'
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div>
                <label for="about" className="block font-bold text-lg">
                  Descripción:
                </label>
                <div className="mt-1">
                  <textarea
                    rows="3"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    type="text"
                    placeholder="Descripción"
                    value={input.description}
                    name="description"
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Breve descripción del Producto.
                </p>
              </div>

              <div className="col-span-3 sm:col-span-2">
                <label className="block font-bold text-lg">Género:</label>

                {genre.map((g) => (
                  <div className="mt-1 ml-2 w-48 border border-gray-400  flex rounded-md shadow-sm hover:bg-gray-800 duration-500 hover:text-white hover:border-black focus:bg-gray-700">
                    <button
                      name={g.value}
                      className="capitalize"
                      type="button"
                      onClick={(e) => handleCheck(e)}
                    >
                      {g.name}
                    </button>
                  </div>
                ))}

                <div className="my-3">
                  <label className="block font-bold text-lg">Categorías:</label>
                  <select
                    className="capitalize"
                    name="categoryId"
                    onChange={(e) => handleSelectCat(e)}
                  >
                    {allCategories?.length &&
                      allCategories.map((e) => (
                        <option value={e.id}>{e.name}</option>
                      ))}
                  </select>
                </div>

                <div className="my-3">
                  <label className="block font-bold text-lg">Marca:</label>
                  <select
                    className="capitalize"
                    name="brandId"
                    onChange={(e) => handleSelectBrand(e)}
                  >
                    {allBrand?.length &&
                      allBrand.map((e) => (
                        <option value={e.id}>{e.name}</option>
                      ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="font-bold text-lg">Stock:</label>
                  <input
                    className="w-16"
                    type="number"
                    placeholder="Escribe una descripcion"
                    value={input.stock}
                    name="stock"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="my-3">
                  <label className="block font-bold text-lg">Precio:</label>
                  <input
                    className="nombre"
                    type="number"
                    placeholder="Escribe una descripcion"
                    value={input.price}
                    name="price"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <label className="block font-bold text-lg">Imagen:</label>

                  <input
                    type="file"
                    //  value={input.image}
                    name="image"
                    multiple
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="volver">
                  <button
                    className="+border-2 bgflex bg-gray-600 p-1 mt-6 w-32 rounded-lg text-white hover:bg-gray-800 transition duration-500 ease-in-out shadow-xl border-gray-300"
                    type="submit"
                  >
                    Crear Producto
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
