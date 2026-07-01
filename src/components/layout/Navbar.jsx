import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  // 🔑 Leemos directamente el texto plano guardado ("Administrador" o "Estudiante")
  const role = localStorage.getItem("rol");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol"); // 🛠️ SOLUCIÓN: Limpiamos también el rol para evitar colisiones
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-[#2b2f26] px-6 py-4 text-[#f4efe3]">
      <div className="flex gap-6">
        
        {/* 🔐 VISTA PARA ADMINISTRADORES */}
        {token && role === "Administrador" && (
          <>
            <Link to="/home" className="hover:underline">Inicio</Link>
            <Link to="/cursos" className="hover:underline">Cursos</Link>
            <Link to="/profesores" className="hover:underline">Profesores</Link>
            <Link to="/categorias" className="hover:underline">Categorías</Link>
            <Link to="/estudiantes" className="hover:underline">Estudiantes</Link>
            <Link to="/matriculas" className="hover:underline">Matrículas</Link>
          </>
        )}

        {/* 🎓 VISTA PARA ESTUDIANTES */}
        {token && role === "Estudiante" && (
          <>
            <Link to="/cursos" className="hover:underline font-semibold text-[#d9b65c]">Cursos Disponibles</Link>
            <Link to="/matriculas" className="hover:underline font-semibold text-[#d9b65c]">Mis Cursos</Link>
          </>
        )}
        
      </div>
      
      {token && (
        <button
          onClick={handleLogout}
          className="rounded-lg bg-[#d9b65c] px-4 py-2 font-semibold text-[#2b2f26] hover:opacity-90 cursor-pointer"
        >
          Cerrar sesión
        </button>
      )}
    </nav>
  );
}