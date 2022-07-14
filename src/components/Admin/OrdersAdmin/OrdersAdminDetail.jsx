import { useSelector, useDispatch } from "react-redux";
import { getAdminOrderDetail } from "../../Redux/action";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./OrdersAdminDetail.css";
import { Grid } from "@mui/material";
import {Link} from 'react-router-dom'
export default function OrdersAdminDetail() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const Order = useSelector((state) => state.adminOrderDetail);
  const { id } = useParams();

  // console.log(productDetail, "prodDetail");
  useEffect(() => {
    if (user) {
      dispatch(getAdminOrderDetail(user.email, id));
    }
  }, [dispatch, user]);

  console.log(Order);
  return (
    
      <div className="mx-auto bg-gray-400 w-[500px] rounded-lg shadow-lg">
        <div className="my-2 ml-2">
          <Grid item xs>
            {" "}
            <h1 className="text-2xl font-bold">Información del Usuario</h1>
            <div className="text-lg mt-1">Id Usuario: {Order[0]?.userId}</div>
            <div className="text-lg mt-1">
              Email Usuario: {Order[0]?.user.email}
            </div>
            <div className="text-lg mt-1">
              Nombre: {Order[0]?.user.names} Surname: {Order[0]?.user.lastNames}
            </div>
            <div className="text-lg mt-1">
              Número de Teléfono: {Order[0]?.user.phone}{" "}
              <p className="text-lg mt-1">
                Fecha de Nacimiento: {Order[0]?.user.birthDate}
              </p>
            </div>
          </Grid>
        </div>
        <div className="my-2 ml-2">
          <Grid item xs={6}>
            {" "}
            <h1 className="text-2xl font-bold">Información del Producto</h1>
            <div className="mt-1 text-lg">
              {Order[0]?.orderItems.map((o) => {
                return (
                  <ul key={o.id} className="product-detail">
                    <li>Nombre: {o.product.name}</li>
                    <li>Cantidad: {o.quantity}</li>
                    <li>Marca: {o.product.brand.name}</li>
                    <li>Precio: {o.product.price} AR$</li>
                  </ul>
                );
              })}
              <div className="flex mt-1 font-semibold">
                Total: {parseFloat(Order[0]?.total).toFixed(2)} AR$
              </div>
            </div>
          </Grid>
        </div>
        <div className="my-2 ml-2">
          <Grid item xs>
            {" "}
            <h1 className="text-2xl font-bold">Información de la Orden</h1>
            <div className="mt-1 text-lg">Id: {Order[0]?.id}</div>
            <div className="mt-1 text-lg">Estado: {Order[0]?.state}</div>
            <div className="mt-1 text-lg">Fecha: {Order[0]?.date}</div>
            <div className="mt-1 text-lg">Provincia: {Order[0]?.estado}</div>
            <div className="mt-1 text-lg">Ciudad: {Order[0]?.city}</div>
            <div className="mt-1 text-lg">Codigo Postal: {Order[0]?.postalCode}</div>
            <div className="mt-1 text-lg">Direccion: {Order[0]?.address}</div>
            <div className="mt-1 text-lg">Apartamento: {Order[0]?.partment}</div>
        <Link to='/admin/order'>
        <button className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 duration-500 my-2">Volver</button>
        </Link>
        </Grid>
        </div>
      </div>
    
  );
}
