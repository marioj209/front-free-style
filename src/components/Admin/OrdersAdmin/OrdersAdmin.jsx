import React from "react";
import NavBar from "../../NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { getAllOrders} from "../../Redux/action";
import { useAuth } from "../../../context/AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import "./OrdersAdmin.css";
import LeftPanel from "../LeftPanel";
export default function OrdersAdmin() {
  const { user} = useAuth()
  const orders = useSelector((state) => state.allOrders);
  const [data, setData] = useState(orders);
  const dispatch = useDispatch();
  console.log(orders,'estas son las ordenes')
  useEffect(() => {
    if(user){
      dispatch(getAllOrders(user.email))
    }
  }, [user])

  function totalProduct(products){
    let total = 0
    products.forEach(element => total = total + element.quantity)
    return total
  }

  const columns = [
    { field: "id",headerName: "ID", width: 150 },
    {
      field: "state",
      headerName: "State",
      width: 200,
      renderCell: (params) => {
        // console.log(params.row.id, "id");
        // console.log(params, "params")
        return (
          <div className="Products MuiDataGrid-row">
            {params.row.state}
          </div>
        );
      },
    },
    {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        // console.log(params.row.id, "id");
        return (
          <div className="Products MuiDataGrid-row">
            {params.row.user.email}
          </div>
        );
      },
    },
    {
      field: "product",
      headerName: "Product Sold",
      type: "number",
      width: 150,
      renderCell: (params) => {
        // console.log(params.row.id, "id");
        console.log(params.row, "params")
        return (
          <div className="Products MuiDataGrid-row">
            {totalProduct(params.row.orderItems)}
          </div>
        );
      },
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="Products MuiDataGrid-row">
            {parseFloat(params.row.total).toFixed(2)}
          </div>
        );
      },
    },
    {
      field: "payment_type",
      headerName: "Payment_type",
      type: "number",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date",
      type: "number",
      width: 150,
    },
    {
      width: 120,
      renderCell: (params) => {
        return (
              <Link to={"/admin/order/" + params.row.id}>
                <button className="productEdit bg-gray-600 px-4 py-2 rounded-lg text-white font-semibold m-5 tracking-wider hover:bg-gray-700 transition duration-500">
                  Detalle{" "}
                </button>
              </Link>
        );
      },
    },
  ];

  const rows = orders?.length ? orders : [];

  return (
    <>
      <div className="flex bg-gray-300">
        <div className="relative">
          <LeftPanel />
        </div>
        <div className="mx-2 w-screen">
          <div className="my-28 border-2 border-gray-400 rounded-lg w-full capitalize shadow-xl bg-gray-200">
            <div
              style={{ height: 800, width: "100%", mixBlendMode: "multiply" }}
            >
              <DataGrid
                rows={rows}
                disableSelectionOnClick
                columns={columns}
                pageSize={12}
                rowsPerPageOptions={[6]}
                checkboxSelection
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
