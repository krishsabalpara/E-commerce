import { Routes, Route } from "react-router-dom";
import AdminPage from "../admin pannel";
import Homepage from "../page/Homepage";
const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default AppRoutes;