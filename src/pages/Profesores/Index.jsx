import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfesoresList() {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔹 Cargar profesores con Token y limpieza de $values
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5080/api/profesores", {
        headers: { Authorization: `Bearer ${token}` } // 🔑 Token añadido
      })
      .then(res => {
        // 🔹 Desempaquetamos los datos limpios de la respuesta de .NET
        const listaLimpia = res.data.$values || res.data.data || res.data;
        setProfesores(Array.isArray(listaLimpia) ? listaLimpia : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar profesores");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando profesores...</p>;

  return (
    <div className="mt-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#72243E]">
            Profesor
          </p>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Profesores
          </h1>
        </div>

        <button
          onClick={() => navigate("/profesores/crear")} // Mapeado a la ruta limpia en español
          className="rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3] hover:bg-[#1e211a] cursor-pointer"
        >
          Nuevo profesor
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-sm text-red-600 rounded-lg bg-red-50 p-3">{error}</p>
      )}

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-5 py-3 text-sm font-medium text-gray-500">
                Nombre
              </th>
              <th className="px-5 py-3 text-sm font-medium text-gray-500">
                Email
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {profesores.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-5 py-10 text-center text-gray-500">
                  No hay profesores registrados en este momento.
                  <button
                    onClick={() => navigate("/profesores/crear")}
                    className="ml-1 font-medium text-gray-900 underline cursor-pointer"
                  >
                    Crea el primero
                  </button>
                </td>
              </tr>
            ) : (
              profesores.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {item.nombre}
                  </td>

                  <td className="px-5 py-3 text-gray-500">
                    {item.email}
                  </td>

                  <td className="px-5 py-3 text-right text-sm space-x-2">
                    <button
                      onClick={() => navigate(`/profesores/edit/${item.id}`)}
                      className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      Editar
                    </button>

                    <span className="text-gray-300">|</span>

                    <button
                      onClick={() => navigate(`/profesores/${item.id}`)}
                      className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      Detalles
                    </button>

                    <span className="text-gray-300">|</span>

                    <button
                      onClick={() => navigate(`/profesores/delete/${item.id}`)}
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
    </div>
  );
}