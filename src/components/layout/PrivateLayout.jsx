// src/components/layout/PrivateLayout.jsx
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function PrivateLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}