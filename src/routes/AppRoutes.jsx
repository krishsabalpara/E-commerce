import { Routes, Route } from "react-router-dom";
import AdminPage from "../admin pannel";
import Homepage from "../page/Homepage";
import Auth from "../page/Login";
import Cart from "../page/Cart"
import Orders from "../page/orders";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<Auth/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/orders" element={<Orders/>}/>
      
    </Routes>
  );
};

export default AppRoutes;