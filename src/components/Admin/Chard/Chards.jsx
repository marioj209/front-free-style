import React, { useEffect} from "react";
import { chardOrders, chardEarnings } from "../../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import LeftPanel from '../LeftPanel'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
} from "recharts";
  
const data = [
  {
    subject: "Aprovado",
    A: 120,
   
  },
  {
    subject: "Rechazado",
    A: 98,
    
  },
  {
    subject: "Pendientes",
    A: 86,
    
  },
];


function Chards() {
    const dispatch = useDispatch();
    const dataEarnings = useSelector((state) => state.dataEarnings);
    const dataOrders = useSelector((state) => state.dataOrders);

    useEffect(() => {
        dispatch(chardEarnings())
        dispatch(chardOrders())
    }, [dispatch])
  console.log(dataOrders, "esto es el dataEarning");
    return (
      <div className="flex bg-gray-300">
        <div className="relative">
          <LeftPanel />
        </div>
        <AreaChart
          width={500}
          height={400}
          data={dataEarnings}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
        <RadarChart
          cx={300}
          cy={250}
          outerRadius={150}
          width={550}
          height={500}
          data={dataOrders}
        >
          <PolarGrid stroke="#656565" />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis stroke="#656565" />
          <Radar
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </div>
    );
  }
  
  export default Chards;
  