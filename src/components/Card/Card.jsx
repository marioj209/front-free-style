import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./Card.css";
import { useAuth } from "../../context/AuthContext";
import {
  getProductDetail,
  addToCart,
  addFavorites,
  removeFavorites,
  getFavorites,
} from "../Redux/action";
import { useRadioGroup } from "@mui/material";
import { toast } from "react-toastify";

export default function Card({ id, name, price, category, image, brand }) {
  const { user } = useAuth();
  let contador = 0;
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.detail);
  const favorite = useSelector((state) => state.favorites);
  //const cartProduct = useSelector((state) => state.cart);

  // console.log(cartProduct,'esto es el cartProduct de la CARD')
  // const { id } = useParams();
  // contador < 2 && console.log(productDetail, 'Soy el producto');

  useEffect(() => {
    if (productDetail.length) {
      productDetail[0].quantity = 1;
      dispatch(addToCart(productDetail[0]));
    }
    
  },[dispatch,productDetail])

  
  // const localStorageCard = localStorage.getItem('cartProducts');
  // const localStorageCardObj=localStorageCard!==null&&JSON.parse(localStorageCard)
  // console.log(localStorageCard, "SOY EL LOCAL STORAGE OBJ DE LA CARD");
  // if (cartProduct !== null) {
  //   localStorage.setItem("cartProducts", JSON.stringify(cartProduct));
  // }

  function addFavorite(e, email, id) {
    e.preventDefault();
    dispatch(addFavorites({ email: email, id: id }));
    setTimeout(function () {
      dispatch(getFavorites(user.email));
    }, 70);
    toast.success("¡Producto añadido a favoritos!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      draggable: true,
    });
  }

  function removeFavorite(e, email, id) {
    e.preventDefault();
    dispatch(removeFavorites({ email: email, id: id }));
    setTimeout(function () {
      dispatch(getFavorites(user.email));
    }, 70);
    toast.error("¡Producto retirado de favoritos!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      draggable: true,
    });
  }
  // useEffect(() => {

  //   if (productDetail?.length) {
  //     console.log('entre al if del useEffect')
  //     dispatch(addToCart(productDetail[0]))
  //     console.log("")
  //   }
  // },[productDetail])

  function handleClick(e) {
    contador += 1;
    toast.success("¡Producto añadido al carrito!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      draggable: true,
    });
    e.preventDefault();
    contador < 2 && dispatch(getProductDetail(id));
  }

  return (
    <Link to={`/detail/${id}`}>
      <div className="card">
        <div className="img">
          <img
            className="object-contain p-4 h-52 w-96 "
            src={image}
            alt="Pic not found"
          />
        </div>
        <div className="p-5">
          <h3 className="Product-title" title={name}>
            {name}
          </h3>

          <p className="text-xl font-bold">Precio: $ {parseFloat(price)}</p>

          {/* <div className="flex items-center gap-2 mt-1">
          <span className="text-sm line-through opacity-50">U$S 59.99</span>
          <span className="discount-percent">save 17%</span>
        </div> */}

          <div className="py-5 flex-col gap-3">
            <div className="flex items-center gap-2">
              {/* <p className="badge">
              <strong>Stock: </strong>
              {card.stock}
            </p> */}
              <p className="badge">{category}</p>
              <p className="badge">{brand}</p>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                className="button-primary"
                onClick={(e) => handleClick(e)}
              >
                Añadir al Carro
              </button>
              <Link to="/cart">
                <button className="button-primary">Carro</button>
              </Link>
              {user ? (
                favorite?.some((p) => p.id === id) ? (
                  <button
                    className="fav-button"
                    onClick={(e) => removeFavorite(e, user.email, id)}
                  >
                    <FavoriteIcon />
                  </button>
                ) : (
                  <button
                    className="fav-button"
                    onClick={(e) => addFavorite(e, user.email, id)}
                  >
                    <FavoriteBorderIcon />
                  </button>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
