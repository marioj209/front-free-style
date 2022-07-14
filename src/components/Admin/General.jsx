import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../context/AuthContext.js";
const data = [
  {
    name: "Ene",
    "Sales": 2000,
    
  },
  {
    name: "Feb",
    "Sales": 3000,
   
  },
  {
    name: "Mar",
    "Sales": 2000,
    
  },
  {
    name: "Apr",
    "Sales": 2780,
    
  },
  {
    name: "May",
    "Sales": 1890,
    
  },
  {
    name: "Jun",
    "Sales": 2390,
    
  },
  {
    name: "Jul",
    "Sales": 1954,
    
  },
  {
    name: "Ago",
    "Sales": 2145,
    
  },
  {
    name: "Sep",
    "Sales": 2680,
    
  },
  {
    name: "Oct",
    "Sales": 2410,
    
  },
  {
    name: "Nov",
    "Sales": 3201,
    
  },
  {
    name: "Dic",
    "Sales": 3490,
    
  },
];

function General() {
  const { user, logout } = useAuth();
  console.log(user, 'esto es lo del')
  const handleLogout = async () => {
    await logout();
  };

  let welcome = user ? "Hola, " + user.email.split('@')[0] : "Hola!!";
  return (
    <>
      <h1 className="flex justify-center text-3xl font-semibold tracking-wider mt-10	">
        {welcome}
      </h1>
      <div className="flex justify-around m-3 font-500 text-2xl mt-10">
        <div className="bg-gray-200 shadow-lg rounded-lg p-4 border-2 border-gray-400">
          <div>
            <span className="text-xl">Ingresos</span>
          </div>
          <div>
            <span>$2,423 </span>
            <span className="ml-5 text-xl text-green-600 tracking-wider">
              1.5+ <ArrowUpwardIcon />
            </span>
          </div>
          <p className="text-xl">Comparado con el último mes</p>
        </div>
        <div className="bg-gray-200 shadow-lg rounded-lg p-4 border-2 border-gray-400">
          <div>
            <span className="text-xl">Costos</span>
          </div>
          <div>
            <span>$1,423 </span>
            <span className="ml-5 text-xl text-green-600 tracking-wider">
              1.8+ <ArrowUpwardIcon />
            </span>
          </div>
          <p className="text-xl">Comparado con el último mes</p>
        </div>
        <div className="bg-gray-200 shadow-lg rounded-lg p-4 border-2 border-gray-400">
          <div>
            <span className="text-xl">Ventas</span>
          </div>
          <div>
            <span>$4,423 </span>
            <span className="ml-5 text-xl text-red-600 tracking-wider">
              -1.4 <ArrowDownwardIcon />
            </span>
          </div>
          <p className="text-xl"> Comparado con la última semana</p>
        </div>
      </div>
      <div className="bg-gray-200 shadow-lg rounded-lg p-4 m-10 mt-32 w-7/12 h-2/4 mx-auto border-2 border-gray-400">
        <h1 className="text-2xl font-semibold my-5 mb-16">Análisis de Ventas</h1>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#888888" />
            <YAxis />
            <Line type="monotone" dataKey="Sales" />
            <Tooltip />
            <CartesianGrid />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default General;
