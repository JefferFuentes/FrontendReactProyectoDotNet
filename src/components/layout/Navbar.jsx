import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  let role = null;

  // Extraemos el rol de forma segura desde el JWT
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch (e) {
      console.error("Error decodificando token en Navbar", e);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-[#2b2f26] px-6 py-4 text-[#f4efe3]">
      <div className="flex gap-6">
        
        {/* 🔒 PESTAÑAS EXCLUSIVAS PARA EL ADMINISTRADOR */}
        {token && role === "Administrador" && (
          <>
            <Link to="/cursos" className="hover:underline">Cursos</Link>
            <Link to="/profesores" className="hover:underline">Profesores</Link>
            <Link to="/categorias" className="hover:underline">Categorías</Link>
            <Link to="/estudiantes" className="hover:underline">Estudiantes</Link>
            <Link to="/matriculas" className="hover:underline">Matrículas</Link>
          </>
        )}

        {/* 🎓 PESTAÑAS EXCLUSIVAS PARA EL ESTUDIANTE */}
        {token && role === "Estudiante" && (
          <>
            <Link to="/cursos" className="hover:underline font-semibold text-[#d9b65c]">Cursos Disponibles</Link>
            {/* Si tienes una vista para ver las clases matriculadas, puedes ponerla aquí, por ejemplo: */}
            {/* <Link to="/matriculas" className="hover:underline">Mis Matrículas</Link> */}
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