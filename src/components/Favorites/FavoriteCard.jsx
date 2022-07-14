import { React} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import './FavoriteCard.css'
import { useAuth } from "../../context/AuthContext";
import { getProductDetail,addToCart, addFavorites, removeFavorites, getFavorites} from "../Redux/action";
import { useRadioGroup } from "@mui/material";


export default function Card({ id, name, price, category, image, brand}) {
  const { user} = useAuth()
  let contador = 0;
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.detail);
  const favorite = useSelector((state) => state.favorites)
  //const cartProduct = useSelector((state) => state.cart);

  // console.log(cartProduct,'esto es el cartProduct de la CARD')
  // const { id } = useParams();
  // contador < 2 && console.log(productDetail, 'Soy el producto');
  
  if (productDetail.length) {
    productDetail[0].quantity = 1
    dispatch(addToCart(productDetail[0]))
  }
  // const localStorageCard = localStorage.getItem('cartProducts');
  // const localStorageCardObj=localStorageCard!==null&&JSON.parse(localStorageCard)
  // console.log(localStorageCard, "SOY EL LOCAL STORAGE OBJ DE LA CARD");
  // if (cartProduct !== null) {
  //   localStorage.setItem("cartProducts", JSON.stringify(cartProduct));
  // }
  

  function removeFavorite(e, email, id){
    e.preventDefault()
    dispatch(removeFavorites({email: email, id: id}))
    setTimeout(function(){
      dispatch(getFavorites(user.email))
    }, 70)
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
    e.preventDefault();
    contador < 2 && dispatch(getProductDetail(id));
  }


  return (
    <Link to={`/detail/${id}`}>
      <div className="card">
        <button className="remove" onClick={(e) => removeFavorite(e, user.email, id)}><CloseIcon/></button>
        <div className="img">
          <img
            className="object-contain h-52 w-96 "
            src={image}
            alt="Pic not found"
          />
        </div>
        <div className="p-5">
          <h3 className="Product-title" title={name}>
            {name}
          </h3>

          <p className="text-xl font-bold">Precio: AR$ {price}</p>

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
                <button className="button-primary">Carrito</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}