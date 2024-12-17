import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./lib/auth";
import Loader from "./components/Loader";
import { useState } from "react";
import { Context } from "./context/serverContext.tsx";
import History from "./components/History.tsx";
import SideBar from "./components/SideBar";
import menu from "/icons/menu-3-line.svg"
import EditProfile from "./components/EditProfile.tsx";

function App() {

  const [isAlive, setIsAlive] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const handleSideBar = () => {
    setShowSidebar(true);
  }

  return (
    <div className="cursor-default">
      <Context.Provider value={{ isAlive, setIsAlive }}>
        {(path !== '/login' && path !== '/register') && (
          <>
            {showSidebar && <SideBar setShowSidebar={setShowSidebar} />}
            <div onClick={handleSideBar} className="absolute right-5 top-5 hover:bg-slate-500 rounded-full duration-300 p-3 cursor-pointer" >
              <img width={25} src={menu} alt="Menu Icon" />
            </div>
          </>
        )}
      
        {!isAlive ? (<Loader />) : (
          <>
            <Routes>
              <Route path="/" element={isAuthenticated() ? (<Navigate to="/addproduct" replace />) : (<Navigate to="/register" replace />)} />
              <Route path="/login" element={<Login />} />
              <Route path="/history" element={<History />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addproduct" element={<ProtectedRoute>{" "}<AddProduct />{" "}</ProtectedRoute>} />
              <Route path="/edit" element={<ProtectedRoute>{" "}<EditProfile />{" "}</ProtectedRoute>} />
            </Routes>
          </>
        )}
      </Context.Provider>
    </div>
  );
}

export default App;
