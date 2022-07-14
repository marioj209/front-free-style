import React from "react";
import SideBar from "../SideBarUser.jsx/SideBar.jsx";
import Filter from "../Filter/Filter";
import Card from "./FavoriteCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategories, getProduct, getBrand, getFavorites } from "../Redux/action";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Paginado from "../Paginado/Paginado";
import "./Favorites.css";

export default function Favorites() {
  const Products = useSelector((state) => state.favorites);
  const cartProduct = useSelector((state) => state.cart);
  const navegate = useNavigate()
  const [params] = useSearchParams();
  const paymentStatus = params.get("status");
  const { user } = useAuth()
  // console.log(paymentStatus, "Este es el paymentStatus");
  // console.log(cartProduct, "ESTE ES EL CART PRODUCT ");
  const dispatch = useDispatch();
  const { genre } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setproductPerPage] = useState(21);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = Products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const [falg, setflag] = useState(false);
  
  // function getAllProducts() {
    

  //   dispatch(getProduct({ genre: genre }));
  // }
  

  function paginado(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    console.log(user)
    if(user){
      dispatch(getFavorites(user.email))
      setflag(true)
    }
    else if (!user && falg){
        setflag(false)
        navegate("/")
    }
  }, [dispatch, genre, user]);

  // const localStorageCard = localStorage.getItem("cartProducts");
  // const localStorageCardObj =
  //   localStorageCard !== null && JSON.parse(localStorageCard);
  // console.log(localStorageCard, "SOY EL LOCAL STORAGE OBJ DE LA CARD");
  // if (cartProduct !== null) {
  //   localStorage.setItem("cartProducts", JSON.stringify(cartProduct));
  // }
  // const localStorageCart = localStorage.getItem("cart");
  // const localStorageObj = JSON.parse(localStorageCart);

  useEffect(() => {
    const localStorageCart = localStorage.getItem("cart");
    if (Array.isArray(JSON.parse(localStorageCart))) {
      const localConverted = JSON.parse(localStorageCart);
      if (
        !localConverted?.find((f) => f?.name === cartProduct?.name) &&
        cartProduct !== null &&
        cartProduct.hasOwnProperty("name")
      ) {
        localStorage.setItem(
          "cart",
          JSON.stringify([...localConverted, cartProduct])
        );
        // console.log("entre al array");
      }
    } else {
      const localCart = JSON.parse(localStorageCart);
      // console.log(localCart, "ESTO ES EL LOCALCART");
      if (
        localCart !== null &&
        localCart.hasOwnProperty("name") &&
        cartProduct !== null &&
        cartProduct?.name !== localCart.name
      ) {
        // console.log(localCart, "soy el localCart del detalle");
        localStorage.setItem("cart", JSON.stringify([localCart, cartProduct]));
      } else if (cartProduct.hasOwnProperty("name")) {
        // console.log(cartProduct,'soy el cartProoduct' )
        localStorage.setItem("cart", JSON.stringify(cartProduct));
      }
    }
  }, [cartProduct]);

  // const cart2=localStorage.getItem("cart")
  // const objCart2=JSON.parse(cart2)
  // console.log(objCart2, "obj")
  return (
    <div className="radial h-full flex relative shadow-xl ">
      <div className="mb-0">

      <SideBar />
      </div>
      <div className="flex-col">
        <div className="products mx-auto">
          <h1 className="font-semibold text-3xl text-center text-gray-300 mt-8">
            Favoritos
          </h1>
        </div>
        <div className="">
          <div className="containerCard flex container-favorites mr-auto ml-auto my-10 ">
            {currentProduct &&
              currentProduct?.map((p) => {
                return (
                  <Card
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    image={p.image}
                    category={p.category.name}
                    brand={p.brand.name}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
