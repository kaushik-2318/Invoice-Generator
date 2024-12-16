import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./lib/auth";
import Loader from "./components/Loader";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={isAuthenticated() ? (<Navigate to="/addproduct" replace />) : (<Navigate to="/register" replace />)} /> */}
        <Route path="/" element={<Loader />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addproduct" element={<ProtectedRoute>{" "}<AddProduct />{" "}</ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
