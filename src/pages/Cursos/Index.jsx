import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function CursosList() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(null); 

  const navigate = useNavigate();

useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      // 🔑 Leemos directamente el rol en texto plano guardado en el Login
      const userRol = localStorage.getItem("rol");
      setUserRole(userRol); // Cambiado para asignar "Administrador" o "Estudiante" directo
    }

    // 🛠️ SOLUCIÓN: Agregamos las cabeceras con el token de seguridad
    axios
      .get("http://localhost:5080/api/cursos", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        // 🛠️ SOLUCIÓN: Desempaquetamos los datos limpios por el formato bizarro de .NET ($values)
        const listaLimpia = res.data.$values || res.data.data || res.data;
        setCursos(Array.isArray(listaLimpia) ? listaLimpia : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar cursos");
        setLoading(false);
      });
  }, []);

  // 🔹 Función para que el estudiante se matricule
  const handleMatricular = async (cursoId) => {
    try {
      const token = localStorage.getItem("token");
      
      await axios.post("http://localhost:5080/api/matriculas/matricular", 
        { cursoId: Number(cursoId) }, // Casteado a número por seguridad para la API
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("¡Inscripción exitosa! El curso ha sido añadido a tus matrículas.");
    } catch (err) {
      alert("Error en la matrícula: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p className="text-center mt-10 font-serif">Cargando...</p>;

  return (
    <div className="mt-8">

      {/* Header Condicional */}
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#712B13]">
            {userRole === "Estudiante" ? "Estudiante" : "Curso"}
          </p>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            {userRole === "Estudiante" ? "Catálogo de Cursos" : "Gestión de Cursos"}
          </h1>
        </div>

        {/* El botón "Nuevo curso" SOLO lo ve el Admin */}
        {userRole !== "Estudiante" && (
          <button
            onClick={() => navigate("/cursos/crear")} // Cambiado a la ruta limpia en español o compatible
            className="rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3] hover:bg-[#1e211a] cursor-pointer"
          >
            Nuevo curso
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-sm text-red-600 rounded-lg bg-red-50 p-3">{error}</p>
      )}

      {/* 🎓 VISTA DEL ESTUDIANTE: Tarjetas elegantes */}
      {userRole === "Estudiante" ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cursos.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-10">No hay cursos disponibles en este momento.</p>
          ) : (
            cursos.map((item) => (
              <div key={item.id} className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div>
                  <span className="mb-3 inline-block rounded-md bg-[#E1F5EE] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#085041]">
                    {item.categoria?.nombre || "General"}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{item.titulo}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">{item.descripcion || "Sin descripción disponible."}</p>
                  <p className="text-xs text-gray-400 mb-1">Duración: {item.duracionHoras} horas</p>
                  <p className="text-xs text-gray-400">Profesor: {item.profesor?.nombre || "Por asignar"}</p>
                </div>
                
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xl font-bold text-[#2b2f26]">₡{item.precio?.toLocaleString()}</span>
                  <button
                    onClick={() => handleMatricular(item.id)}
                    className="cursor-pointer rounded-lg bg-[#2b2f26] px-4 py-2 text-sm font-semibold text-[#f4efe3] transition hover:bg-[#1e211a]"
                  >
                    Matricularme
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        
        // 🔒 VISTA DEL ADMINISTRADOR: Tabla original de tus compañeros
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-5 py-3 text-sm font-medium text-gray-500">Título</th>
                <th className="px-5 py-3 text-sm font-medium text-gray-500">Horas</th>
                <th className="px-5 py-3 text-sm font-medium text-gray-500">Precio</th>
                <th className="px-5 py-3 text-sm font-medium text-gray-500">Profesor</th>
                <th className="px-5 py-3 text-sm font-medium text-gray-500">Categoría</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cursos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-10 text-center text-gray-500">
                    No hay cursos registrados en el sistema.
                    <button
                      onClick={() => navigate("/cursos/crear")}
                      className="ml-1 font-medium text-gray-900 underline cursor-pointer"
                    >
                      Crea el primero
                    </button>
                  </td>
                </tr>
              ) : (
                cursos.map((item) => (
                  <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{item.titulo}</td>
                    <td className="px-5 py-3 text-gray-500">{item.duracionHoras} h</td>
                    <td className="px-5 py-3 text-gray-500">₡{item.precio?.toLocaleString()}</td>
                    <td className="px-5 py-3 text-gray-500">{item.profesor?.nombre || "Sin asignar"}</td>
                    <td className="px-5 py-3">
                      <span className="inline-block rounded-md bg-[#E1F5EE] px-2.5 py-1 text-xs font-bold uppercase text-[#085041]">
                        {item.categoria?.nombre || "General"}
                      </span>
                    </td>

                    <td className="px-5 py-3 text-right text-sm space-x-2">
                      <button
                        onClick={() => navigate(`/cursos/edit/${item.id}`)}
                        className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        Editar
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => navigate(`/cursos/${item.id}`)}
                        className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        Detalles
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => navigate(`/cursos/delete/${item.id}`)}
                        className="font-medium text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}