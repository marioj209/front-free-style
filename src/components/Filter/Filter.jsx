import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getProduct, getCategories, getBrand } from "../Redux/action";
import "./Filter.css";
// import { bgBG } from "@mui/x-data-grid";

export default function Filter({ paginado }) {
  const [genres, setGenres] = useState();
  const categories = useSelector((state) => state.categories);
  const brands = useSelector((state) => state.brand);
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { genre } = useParams();

  // console.log(genre, "estooo es genres del params");

  function handleOrderPrice(e) {
    // if (genres === genre && genre) {
      setGenres(genre);
      setPrice(e.target.value);
      dispatch(
        getProduct({
          genre: genre,
          price: e.target.value,
          categoryId: category,
          brandId: brand,
        })
      );
    // } else {
    //   setBrand(undefined);
    //   setCategory(undefined);
    //   setPrice(e.target.value);
    //   setGenres(genre);
    //   dispatch(getProduct({ genre: genre, price: e.target.value }));
    // }

    paginado(1);
  }

  function handleCheck(e) {
    // console.log(e.target.value === category, "esto es loo que llega");
    // if (genres === genre && genre) {
    e.preventDefault();
      setGenres(genre);
      setCategory(e.target.value);
      dispatch(
        getProduct({
          genre: genre,
          categoryId: e.target.value,
          brandId: brand,
          price: price,
        })
      );
      dispatch(getBrand({ genre: genre, category: e.target.value }));
    //} 
  //else {
  //     setBrand(undefined);
  //     setCategory(e.target.value);
  //     setPrice(undefined);
  //     setGenres(genre);
  //     dispatch(getProduct({ genre: genre, categoryId: e.target.value }));
  //     dispatch(getBrand({ genre: genre, category: e.target.value }));
  //   }

    paginado(1);
  }

  // console.log(category, "este es la category", brand, "esta es la marca");

  function handleReset(e) {
    e.preventDefault();
    const name = e.target.name;
    switch (name) {
      case "women":
        navigate("/products/women");
        paginado(1);
        dispatch(getProduct({ search: "", genre: genre }));
        dispatch(getBrand({genre:genre}))
        dispatch(getCategories({genre:genre}))
        setBrand(undefined);
        setCategory(undefined);
        setPrice(undefined);

        break;
      case "men":
        navigate("/products/men");
        paginado(1);
        dispatch(getProduct({ search: "", genre: genre }));
        dispatch(getBrand({ genre: genre }));
        dispatch(getCategories({ genre: genre }));
        setBrand(undefined);
        setCategory(undefined);
        setPrice(undefined);

        break;
      case "kids":
        navigate("/products/kids");
        dispatch(getProduct({ search: "", genre: genre }));
        dispatch(getBrand({ genre: genre }));
        dispatch(getCategories({ genre: genre }));
        paginado(1);
        setBrand(undefined);
        setCategory(undefined);
        setPrice(undefined);

        break;
      case "no-gender":
        navigate("/products/no-gender");
        paginado(1);
        dispatch(getProduct({ search: "", genre: genre }));
        dispatch(getBrand({ genre: genre }));
        dispatch(getCategories({ genre: genre }));
        setBrand(undefined);
        setCategory(undefined);
        setPrice(undefined);

        break;
      default:
        navigate("/products");
        paginado(1);
        dispatch(getProduct({ search: "" }));
        dispatch(getBrand({ genre: genre }));
        dispatch(getCategories({ genre: genre }));
        setBrand(undefined);
        setCategory(undefined);
        setPrice(undefined);
        break;
    }
  }

  function handleCheckBrand(e) {
    // if (genres === genre && genre) {
    e.preventDefault();
    setGenres(genre);
    setBrand(e.target.value);
    dispatch(
      getProduct({
        genre: genre,
        brandId: e.target.value,
        categoryId: category,
        price: price,
      })
    );

    dispatch(getCategories({ genre: genre, brand: e.target.value }));
    paginado(1)
    // } else {
    //   setBrand(e.target.value);
    //   setCategory(undefined);
    //   setPrice(undefined);
    //   setGenres(genre);
    //   dispatch(getProduct({ genre: genre, brandId: e.target.value }));
    //   dispatch(getCategories({ genre: genre, brand: e.target.value }));
    // }
  }
  console.log(brands, 'estas son las marcas6')
  return (
    <div>
      <div className="category flex flex-col">
        <h1 className="text-3xl font-semibold">Géneros</h1>
        <div className="ml-2 ">
          <div className="item-left  ">
            <button
              className={genre === undefined ? "On" : "Off"}
              name="all"
              onClick={(e) => handleReset(e)}
            >
              Productos
            </button>
          </div>

          <div className="">
            <button
              className={genre === "women" ? "On" : "Off"}
              name="women"
              onClick={(e) => handleReset(e)}
            >
              Mujer
            </button>
          </div>

          <div className="">
            <button
              className={genre === "men" ? "On" : "Off"}
              name="men"
              onClick={(e) => handleReset(e)}
            >
              Hombre
            </button>
          </div>
          <div className="">
            <button
              className={genre === "no-gender" ? "On" : "Off"}
              name="no-gender"
              onClick={(e) => handleReset(e)}
            >
              Sin Género
            </button>
          </div>

          <div className="">
            <button
              className={genre === "kids" ? "On" : "Off"}
              name="kids"
              onClick={(e) => handleReset(e)}
            >
              Niños
            </button>
          </div>
        </div>
      </div>
      <div className="price mt-4 ">
        <h1 className="text-3xl font-semibold">Precio</h1>

        <select
          onChange={(e) => handleOrderPrice(e)}
          className="border-solid border-2 border-black mt-4 rounded-lg capitalize font-semibold"
        >
          <option value="">Selecciona Precio</option>
          <option value="ASC">Menor Precio</option>
          <option value="DESC">Mayor Precio</option>
        </select>
      </div>
      <div className="brands mt-6 ">
        <h1 className="text-3xl font-semibold">Marcas</h1>

        {brands?.map((b) => {
          return (
            <div key={b.id}>
              <button
                value={b.id}
                name={b.name}
                className="hover:bg-blue-200 active:bg-violet-200 focus:bg-red-500 rounded-sm flex inline capitalize ml-2"
                onClick={(e) => handleCheckBrand(e)}
              >
                {b.name}
              </button>
            </div>
          );
        })}
      </div>

      <div className="categories mt-6 ">
        <h1 className="text-3xl font-semibold">Categorías</h1>
        {categories?.map((c) => {
          return (
            <div key={c.id}>
              <button
                value={c.id}
                name={c.name}
                onClick={(e) => handleCheck(e)}
                className="hover:bg-blue-200 active:bg-violet-200 focus:bg-red-500 rounded-sm flex inline capitalize ml-2"
              >
                {c.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
