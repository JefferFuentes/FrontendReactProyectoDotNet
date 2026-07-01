import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EstudiantesList() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

 useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5080/api/usuarios", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const listaLimpia = res.data.$values || res.data.data || res.data;
        
        if (Array.isArray(listaLimpia)) {
          
          const soloEstudiantes = listaLimpia.filter(user => user.rol === "Estudiante" || user.Rol === "Estudiante");
          setEstudiantes(soloEstudiantes);
        } else {
          setEstudiantes([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando usuarios:", err);
        setError("Error al conectar con el endpoint de usuarios de la API.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500 font-medium">Cargando alumnos inscritos...</p>;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#3C3489]">
            Panel de Control
          </p>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Estudiantes Inscritos
          </h1>
        </div>
        
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600 rounded-lg bg-red-50 p-3">{error}</p>
      )}

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-5 py-3 text-sm font-medium text-gray-500">Nombre Completo</th>
              <th className="px-5 py-3 text-sm font-medium text-gray-500">Correo Electrónico</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-5 py-10 text-center text-gray-500">
                  No hay estudiantes inscritos.{" "}
                  
                </td>
              </tr>
            ) : (
              estudiantes.map((item) => (
                <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{item.nombre}</td>
                  <td className="px-5 py-3 text-gray-500">{item.email}</td>
                  <td className="px-5 py-3 text-right text-sm space-x-2">
                   
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => navigate(`/estudiantes/delete/${item.id}`)}
                      className="font-medium text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      Dar de baja
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}