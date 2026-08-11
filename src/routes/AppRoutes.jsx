import { Routes, Route } from "react-router-dom";
import AdminPage from "../admin pannel";
import Homepage from "../page/Homepage";
import Auth from "../page/Login";
const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<Auth/>}/>
    </Routes>
  );
};

export default AppRoutes;