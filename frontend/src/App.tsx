import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./lib/auth";
import Loader from "./components/Loader";
import { useState } from "react";
import { Context } from "./context/serverContext.tsx";

function App() {

  const [isAlive, setIsAlive] = useState(false);

  return (
    <>
      <Context.Provider value={{ isAlive, setIsAlive }}>
        {!isAlive ? (<Loader />) : (
          <>
            <Routes>
              <Route path="/" element={isAuthenticated() ? (<Navigate to="/addproduct" replace />) : (<Navigate to="/register" replace />)} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addproduct" element={<ProtectedRoute>{" "}<AddProduct />{" "}</ProtectedRoute>} />
            </Routes>
          </>
        )}

      </Context.Provider>
    </>
  );
}

export default App;
