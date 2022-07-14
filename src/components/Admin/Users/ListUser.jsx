import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllUsers } from "../../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { enableUsers } from "../../Redux/action.js";
import Modal from "@mui/material/Modal";
import { statusAdmi } from "../../Redux/action.js";
import { userDetailAdmin } from "../../Redux/action.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LeftPanel from '../LeftPanel'

function ListUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);
  const userDetail = useSelector((state) => state.userDetailAdmin.users);
  const rows = users.map((e) => e);

  const enable = (e) => {
    e.preventDefault();
    dispatch(enableUsers(e.target.name));
    setTimeout(function () {
      dispatch(getAllUsers());
    }, 70);
  };

  const statusAdmin = (e) => {
    e.preventDefault();
    
    dispatch(statusAdmi(e.target.name));
    setTimeout(function () {
      dispatch(getAllUsers())
    },70 )
    
    
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      renderCell: (params) => {
        return <span>{params?.row.id}</span>;
      },
    },
    {
      field: "user",
      headerName: "user",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="w-20 flex items-center">
            {/* <img
              src={params.row.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full mr-4"
            ></img> */}
            {params?.row.names}
          </div>
        );
      },
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 160,
      renderCell: (params) => {
        return <span>{params?.row.lastNames}</span>;
      },
    },

    {
      field: "Email",
      headerName: "Email",
      width: 250,
      renderCell: (params) => {
        return <span>{params?.row.email}</span>;
      },
    },
    {
      field: "Enable",
      headerName: "Enable",
      width: 100,
      renderCell: (params) => {
        return <span>{params?.row.enabled === true ? "true" : "false"}</span>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <button
            onClick={enable}
            name={params?.row.id}
            className="bg-tertiary text-black rounded-md p-2 hover:bg-gray-600 transition duration-500 ease-in-out shadow-lg hover:text-white font-semibold"
          >
            {params?.row.enabled === true ? "Disable" : "Enable"}
          </button>
        );
      },
    },

    {
      field: "admin",
      headerName: "Admin",
      width: 100,
      renderCell: (params) => {
        return <span>{params?.row.isAdmin === true ? "true" : "false"}</span>;
      },
    },

    {
      field: "actionAdmin",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <button
            onClick={statusAdmin}
            name={params?.row.id}
            className="bg-tertiary text-black rounded-md p-2 hover:bg-gray-600 transition duration-500 ease-in-out shadow-lg hover:text-white font-semibold"
          >
            Admin
          </button>
        );
      },
    },

    {
      field: "profile",
      headerName: "Profile",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            name={params?.row.email}
            onClick={handleOpen}
            className="cursor-pointer m-auto"
          >
            Info
          </button>
        );
      },
    },
  ];

  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    event.preventDefault();

    dispatch(userDetailAdmin(event.target.name));
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="flex bg-gray-300">
      <div className="relative">
        <LeftPanel />
      </div>
      <div className="rounded-lg my-28 shadow-2xl w-screen mx-2 bg-gray-200 mb-48 border-2 border-gray-400/100">
        <div style={{ height: 700, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={12}
            rowsPerPageOptions={[12]}
          />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="w-2/4 h-auto bg-secondary text-white m-auto mt-40 rounded-md p-6 flex flex-col items-center ">
          <img
            src="https://static.vecteezy.com/ti/vetor-gratis/p1/2310383-avatar-menino-crianca-feliz-gr%C3%A1tis-vetor.jpg"
            alt="avatar"
            className="w-40 h-40 rounded-full"
          />
          <span className="mb-2 mt-2">Nombre: {userDetail?.names}</span>
          <span className="mb-2">Apellido: {userDetail?.lastNames}</span>
          <span className="mb-2">Email: {userDetail?.email}</span>
          <span className="mb-2">Fecha de Nacimiento: {userDetail?.birthDate}</span>
          <span>Número de Teléfono: {userDetail?.phone}</span>
        </div>
      </Modal>
    </div>
  );
}

export default ListUser;
