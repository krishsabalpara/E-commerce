import { Routes, Route } from "react-router-dom";
import AdminPage from "../admin pannel";
import Homepage from "../page/Homepage";
import Auth from "../page/Login";
import Cart from "../page/Cart";
import Orders from "../page/orders";

/**
 * AppRoutes - Defines all client-side routes for the application.
 *
 * Routes:
 *  /        → Homepage (product listing with navbar, hero, categories)
 *  /admin   → Admin dashboard (product/category/order management)
 *  /login   → Authentication page (login & signup)
 *  /cart    → Shopping cart with checkout
 *  /orders  → User's order history
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default AppRoutes;