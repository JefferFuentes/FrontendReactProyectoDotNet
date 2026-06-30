// src/components/layout/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-[#2b2f26] px-6 py-4 text-[#f4efe3]">
      <div className="flex gap-6">
        <Link to="/cursos" className="hover:underline">Cursos</Link>
        <Link to="/profesores" className="hover:underline">Profesores</Link>
        <Link to="/categorias" className="hover:underline">Categorías</Link>
        <Link to="/estudiantes" className="hover:underline">Estudiantes</Link>
        <Link to="/matriculas" className="hover:underline">Matrículas</Link>
      </div>
      <button
        onClick={handleLogout}
        className="rounded-lg bg-[#d9b65c] px-4 py-2 font-semibold text-[#2b2f26] hover:opacity-90"
      >
        Cerrar sesión
      </button>
    </nav>
  );
}