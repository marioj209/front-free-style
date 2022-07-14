import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct,getProductAdmi,updateProduct } from "../../Redux/action";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import LeftPanel from "../LeftPanel";
import "./ProductAdmi.css";
import { Link } from "react-router-dom";
// import EditProduct from "./EditProduct";

function ProductsAdmi() {
  const allProducts = useSelector((state) => state.productAdmi);
  const dispatch = useDispatch();

  console.log(allProducts,'esto es el estado productsAdmi')
  
  // console.log(data, "data");

  function handleDelete(id,e) {
    dispatch(updateProduct(id, !e.target.checked));
  }
  useEffect(() => {
    dispatch(getProductAdmi({ genre: undefined }));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Nombre",
      width: 280,
      renderCell: (params) => {
        // console.log(params.row.id, "id");
        // console.log(params, "params")
        return (
          <div className="Products MuiDataGrid-row">
            <img
              className="prodImage "
              src={params.row.image[0]}
              alt="product"
            />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Descripción",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 350,
    },
    {
      field: "price",
      headerName: "Precio",
      type: "number",
      width: 220,
    },
    {
      field: "action",
      headerName: "Acción",
      width: 350,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/products/" + params.row.id}>
              <button className="productEdit bg-tertiary text-black rounded-md p-2 hover:bg-gray-600 transition duration-500 ease-in-out shadow-lg hover:text-white font-semibold mx-4 px-4">
                Editar{" "}
              </button>
            </Link>
            <label className="switchBtn   text-white bg-gray-400 ">
              <input
                type="checkbox"
                onClick={(e) => {
                  handleDelete(params.row.id, e);
                }}
                defaultChecked={params.row.enabled}
              />
              <div className="slide round font-semibold">Activo</div>
            </label>
          </>
        );
      },
    },
  ];

  const rows = allProducts?.length ? allProducts : [];

  return (
    <>
      <div className="flex bg-gray-300">
        <div className="relative">
          <LeftPanel />
        </div>
        <div className="mx-2 w-screen">
          <div className="flex justify-end ">
            <Link to="/admin/create">
              <button
                className="flex bg-gray-600 p-4 mt-4 rounded-lg text-white hover:bg-gray-800 transition duration-500 ease-in-out shadow-xl "
                variant="contained"
              >
                Crear Producto
              </button>
            </Link>
          </div>

          <div className="mt-8 w-full capitalize shadow-xl bg-gray-200 border-2 border-gray-400/100 rounded-lg ">
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

export default ProductsAdmi;
