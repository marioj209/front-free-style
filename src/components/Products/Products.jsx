import React from "react";
import NavBar from "../searchBar/Search";
import Filter from "../Filter/Filter";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getCategories,
  getProduct,
  getBrand,
  process_payment,
  resetAllComments,
  userType
} from "../Redux/action";
import { useParams, useSearchParams, useLocation, useNavigate} from "react-router-dom";
import Paginado from "../Paginado/Paginado";
import "./Products.css";
import { useAuth } from "../../context/AuthContext";


export default function Products() {
  const navegate = useNavigate()
  const { user} = useAuth()
  const Products = useSelector((state) => state.products);
  const cartProduct = useSelector((state) => state.cart);
  const [params] = useSearchParams();
  const paymentStatus = params.get("status");
  const backInfo = useLocation().search;
  // console.log(paymentStatus, "Este es el paymentStatus");
  // console.log(cartProduct, "ESTE ES EL CART PRODUCT ");
  const dispatch = useDispatch();
  const { genre } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setproductPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = Products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  
  // function getAllProducts() {
    

  //   dispatch(getProduct({ genre: genre }));
  // }

  function paginado(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    console.log(user)
    if (backInfo && user){
      const product = JSON.parse(localStorage.getItem('cart'))
      if(product){
        dispatch(process_payment({data: backInfo, body:{product: product, user:user.email }}))
        paymentStatus === "approved" && localStorage.removeItem("cart");
        navegate("/products")
      }
    }
    if(user){
      dispatch(userType(user.email))
    }
    dispatch(getProduct({ genre: genre }));
    dispatch(getCategories({ genre: genre }));
    dispatch(getBrand({ genre: genre }));
    dispatch(resetAllComments())
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
    <div>
      <NavBar />
      <div className="productsCards">
        <h1>Productos</h1>
      </div>
      <div className="cards2">
        <div className="card2">
          <Filter paginado={paginado} />
        </div>
        <div className="containerCards">
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
      <div className="mb-4">
      <Paginado
        productPerPage={productPerPage}
        currentPage={currentPage}
        Products={Products.length}
        paginado={paginado}
        />
        </div>
    </div>
  );
}
