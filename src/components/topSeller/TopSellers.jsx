import React, { useEffect } from "react";
import { topSeller } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Card/Card.css";

function TopSellers() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.topSel);

  useEffect(() => {
    dispatch(topSeller());
  }, [dispatch]);
  return (
    <div className=" w-screen h-auto flex flex-row justify-around">
      {products.map((e) => (
        <Link to={`/detail/${e.id}`} key={e.id}>
          <div >
            <div className="img">
              <img src={e.image} alt="Not found" className="object-contais w-56 h-72" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TopSellers;
