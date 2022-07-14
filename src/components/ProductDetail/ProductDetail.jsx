import Navbar from "../NavBar";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetail,
  reset,
  addToCartDetail,
  resetCart,
  getComments,
  permisonUser,
  postComments,
  editComment,
  deleteComment,
} from "../Redux/action";
import Rating from "@mui/material/Rating";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Detail.css";
import { useAuth } from "../../context/AuthContext";
import {toast} from 'react-toastify'

export default function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const productDetail = useSelector((state) => state.detail);
  const cartProductDetail = useSelector((state) => state.cartDetail);
  const comments = useSelector((state) => state.comments);
  const permison = useSelector((state) => state.permison);
  // console.log(cartProductDetail,'esto es el cartProductDetail del detalle')
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [postComment, setPostComment] = useState({
    rating: "",
    review: "",
  });

  // console.log(productDetail, "prodDetail");
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(resetCart());
  }, [dispatch]);

  useEffect(() => {
    const localStorageCart = localStorage.getItem("cart");
    if (Array.isArray(JSON.parse(localStorageCart))) {
      const localConverted = JSON.parse(localStorageCart);
      if (
        !localConverted?.find((f) => f?.name === cartProductDetail?.name) &&
        cartProductDetail !== null &&
        cartProductDetail.hasOwnProperty("name")
      ) {
        localStorage.setItem(
          "cart",
          JSON.stringify([...localConverted, cartProductDetail])
        );
        // console.log("entre al array");
      }
    } else {
      const localCart = JSON.parse(localStorageCart);
      // console.log(localCart,'ESTO ES EL LOCALCART')
      if (
        localCart !== null &&
        localCart.hasOwnProperty("name") &&
        cartProductDetail !== null &&
        cartProductDetail?.name !== localCart.name
      ) {
        // console.log(localCart, "soy el localCart del detalle");
        localStorage.setItem(
          "cart",
          JSON.stringify([localCart, cartProductDetail])
        );
      } else if (cartProductDetail.hasOwnProperty("name")) {
        // console.log(cartProductDetail,'soy el cartProoduct' )
        localStorage.setItem("cart", JSON.stringify(cartProductDetail));
      }
    }
  }, [cartProductDetail]);

  // const cart2=localStorage.getItem("cart")
  // const objCart2=JSON.parse(cart2)

  const handleChange = (e) => {
    setPostComment({
      ...postComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumit = (e) => {
    e.preventDefault();
    dispatch(postComments(postComment, user.email, id));
    setTimeout(() => {
      dispatch(getComments(id));
      dispatch(permisonUser(user.email, id));
      dispatch(getProductDetail(id));
    }, 100);
  };

  const localStorageCart = localStorage.getItem("cart");
  //const localStorageObj = JSON.parse(localStorageCart);
  // console.log(localStorageObj, "llego el lechero");

  function handleAddToCart() {
    productDetail[0].quantity = 1;
    dispatch(addToCartDetail(productDetail[0]));
    toast.success('¡Producto añadido al carrito!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      draggable: true,
    })
    // console.log('me ejecute addToCart')
    // if (!objCart2.some((p) => p.name.includes(productDetail[0].name))) {
    //   setCart([...objCart2,productDetail[0]]);
    //   console.log("entre al if")
    // }
  }
  function backOnClicke(e) {
    e.preventDefault();
    dispatch(reset());
    navigate("/products");
  }

  function handleDelete(e, orderId) {
    e.preventDefault();
    dispatch(deleteComment(orderId, id));
    setTimeout(() => {
      dispatch(getComments(id));
      dispatch(permisonUser(user.email, id));
      dispatch(getProductDetail(id));
      setEdit(false);
    }, 100);
  }

  function handleComments(e) {
    if (user) {
      e.preventDefault();
      dispatch(getComments(id));
      dispatch(permisonUser(user.email, id));
    } else {
      navigate("/login");
    }
  }
  function handleEdit(e, rating, review, id) {
    setPostComment({
      rating: rating,
      review: review,
      orderId: id,
    });
    setEdit(true);
  }

  function handleEdited(e) {
    e.preventDefault();
    dispatch(editComment(postComment, user.email, id));
    setTimeout(() => {
      dispatch(getComments(id));
      dispatch(permisonUser(user.email, id));
      dispatch(getProductDetail(id));
      setEdit(false);
    }, 100);
  }

  return (
    <>
      <Navbar />
      {
        <div className="pt-4">
          {/* Image gallery */}
          <div className="mt-10 max-w-2xl mb-20 mx-auto sm:px-6 lg:max-w-5xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-2">
            <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
              <img
                src={productDetail[0] && productDetail[0].image[0]}
                alt={productDetail[0] && productDetail[0].image[0]}
                className="object-contain h-96 w-96 detalle"
              />
            </div>

            {/* Product name */}
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-xl lg:pt-5 lg:px-8 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
              <div className="lg:col-span-5 lg:pr-10 ">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 capitalize ">
                  {productDetail[0] && productDetail[0].name}
                </h1>
              </div>

              {/* Product Description & category */}
              <div className=" mt-2 py-10 lg:pt-6 lg:pb-6 lg:col-start-1 lg:col-span-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Descripción
                  </h3>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-900">
                      {productDetail[0] &&
                        productDetail[0].description.charAt(0).toUpperCase() +
                          productDetail[0].description.slice(1)}
                    </p>
                  </div>
                </div>

                <div className="mt-2">
                  <h2 className="text-xl font-bold text-gray-900">Géneros</h2>
                  <div className="space-y-1">
                    <p className="text-lg text-gray-600 capitalize">
                      {productDetail[0] && productDetail[0].genre}
                    </p>

                    <div className="capitalize">
                      <h2 className="text-xl font-bold">Marcas</h2>
                      <p className="text-xl">
                        {productDetail[0] && productDetail[0].brand.name}
                      </p>
                    </div>

                    <div className="capitalize">
                      <h2 className="text-xl font-bold">Stock</h2>
                      <p className="text-xl">
                        {productDetail[0] && productDetail[0].stock}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product Score */}
                {/* Sustituir el 4 por productDetail[0].rating */}
                <h3 className=" mt-2 text-xl font-bold text-gray-900">
                  Puntuación
                </h3>
                {productDetail[0] ? (
                  <Rating value={productDetail[0].rating} readOnly />
                ) : null}
              </div>

              {/* Product price */}
              <div className="mt-4 lg:mt-0 lg:row-span-3">
                <h2 className="sr-only">Información del Producto</h2>
                <p className="text-2xl font-bold text-gray-900">
                  Precio: ${productDetail[0] && productDetail[0].price}
                </p>
                <button
                  type="submit"
                  className="mt-10 w-full bg-primary border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={(e) => handleComments(e)}
                >
                  ver comentarios
                </button>

                {/* Product bottom cart */}
                <div className="">
                  <button
                    type="submit"
                    className="mt-10 w-full bg-primary border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={(e) => handleAddToCart(e)}
                  >
                    Añadir al carro
                  </button>
                </div>
              </div>
            </div>
          </div>
          {comments ? (
            permison ? (
              <form onSubmit={(e) => handleSumit(e)}>
                <div>
                  <Rating
                    name="rating"
                    value={parseInt(postComment.rating)}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label></label>
                  <input
                    type="text"
                    name="review"
                    value={postComment.review}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <button type="submit">
                  <span>Comentar</span>
                </button>
              </form>
            ) : null
          ) : null}
          {edit ? (
            <form onSubmit={(e) => handleEdited(e)}>
              <div>
                <Rating
                  name="rating"
                  value={parseInt(postComment.rating)}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label></label>
                <input
                  type="text"
                  name="review"
                  value={postComment.review}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <button type="submit">
                <span>Comentar</span>
              </button>
            </form>
          ) : null}
          {comments ? (
            comments[0] ? (
              <div className="ml-5">
                <h1 className="text-lg font-bold">Comentarios</h1>
                {comments.map((c, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        c.user.email === user?.email && edit
                          ? "disable"
                          : "anable"
                      }
                    >
                      Comentario de {c.user.email.split("@")[0]}
                      <Rating name="read-only" value={c.rating} readOnly />
                      <div className="my-2">{c.review}</div>
                      {c.user.email === user?.email ? (
                        <div>
                          <button
                            className="bg-black p-2 rounded-lg text-white font-semibold hover:bg-gray-800 duration-500"
                            onClick={(e) =>
                              handleEdit(e, c.rating, c.review, c.id)
                            }
                          >
                            Editar comentario
                          </button>
                          <button
                            className="ml-2"
                            onClick={(e) => handleDelete(e, c.id)}>
                            <CancelIcon />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>no existen comentarios en este producto</div>
            )
          ) : null}

          {/* Bottom Back */}

          <button
            className="bg-black w-32 h-12 rounded-lg shadow-lg border-2 border-gray-600 ml-5 mt-5 text-white hover:bg-gray-700 duration-500"
            onClick={(e) => backOnClicke(e)}
          >
            Volver
          </button>
        </div>
      }
    </>
  );
}
