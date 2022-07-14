import React from "react";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Home from "./components/Home/Home.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import { UserRegister } from "./components/UserRegister";
import ShoppingCart from "./components/ShoppingCart/ShopppingCart";
import { AuthProvider } from "./context/AuthContext";
import Reset from "./components/reset/Reset";


import Products from "./components/Products/Products";



import Checkout from "./components/Checkout/Checkout.jsx";
import Admin from "./components/Admin/Admin";

import FormProduct from "./components/Admin/Products/FormProduct";
import EditProduct from "./components/Admin/Products/EditProduct";
import ProductsAdmi from "./components/Admin/Products/ProductsAdmi";
import ListUser from "./components/Admin/Users/ListUser";
import OrdersAdmin from "./components/Admin/OrdersAdmin/OrdersAdmin";
import Favorites from "./components/Favorites/Favorites";
// import Checkout from "./components/Checkout/Checkout.jsx";
import CheckoutAddress from "./components/Checkout/CheckoutAddress";
import EditProfile from "./components/UserDashboard/EditProfile";
import UserProfile from "./components/UserDashboard/UserProfile";
import OrderAdminDetail from "./components/Admin/OrdersAdmin/OrdersAdminDetail";
import Historial from "./components/Historial";
import AdminProfile from "./components/Admin/Profile/AdminProfile";
import AdminEdit from "./components/Admin/Profile/AdminEdit";
import ContactUs from "./components/ContactUs/ContactUs";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import Chards from "./components/Admin/Chard/Chards"

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:genre" element={<Products />} />
          <Route path="/detail/:id" exact element={<ProductDetail />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/checkout" element={<CheckoutAddress />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/profile/edit/:id" element={<AdminEdit />} />
          <Route path="/admin/products" element={<ProductsAdmi />} />
          <Route path="/admin/create" element={<FormProduct />} />
          <Route path="/admin/products/:id" element={<EditProduct />} />
          <Route path="/admin/user" element={<ListUser />} />
          <Route path="/admin/order" element={<OrdersAdmin />} />
          <Route path="/admin/order/:id" element={<OrderAdminDetail />} />
          <Route path="/admin/stats" element={<Chards />} />
          <Route path="/reset" component={<Reset />} />
          <Route path="/profile/:id" element={<EditProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/favorites" element={<Favorites />} />
          <Route path="/profile/history" element={<Historial />} />
          <Route path="/profile/contact" element={<ContactUs/>} />
          <Route path="/profile/detail/:id" element={<OrderDetails/>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
