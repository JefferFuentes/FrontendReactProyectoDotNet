import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ rolesPermitidos }) {
  const token = localStorage.getItem("token");
  const userRol = localStorage.getItem("rol"); // Leemos el string directo ("Administrador" o "Estudiante")

  // Si no está logueado, lo mandamos al Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta requiere un rol (ej: Administrador) y el usuario actual no lo tiene, lo saca al Home
  if (rolesPermitidos && !rolesPermitidos.includes(userRol)) {
    console.warn(`Acceso restringido: Requiere ${rolesPermitidos}. Tu rol: ${userRol}`);
    return <Navigate to="/home" replace />;
  }

  // Si pasa la validación, renderiza el módulo solicitado
  return <Outlet />;
}