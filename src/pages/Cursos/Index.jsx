import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CursosList() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔹 cargar cursos
  useEffect(() => {
    axios
      .get("http://localhost:5080/api/cursos")
      .then(res => {
        setCursos(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar cursos");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="mt-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#712B13]">
            Curso
          </p>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Cursos
          </h1>
        </div>

        <button
          onClick={() => navigate("/cursos/create")}
          className="rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3] hover:bg-[#1e211a]"
        >
          Nuevo curso
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left">

          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-5 py-3 text-sm font-medium text-gray-500">
                Título
              </th>
              <th className="px-5 py-3 text-sm font-medium text-gray-500">
                Horas
              </th>
              <th className="px-5 py-3 text-sm font-medium text-gray-500">
                Precio
              </th>
              <th className="px-5 py-3 text-sm font-medium text-gray-500">
                Profesor
              </th>
              <th className="px-5 py-3 text-sm font-medium text-gray-500">
                Categoría
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {cursos.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-5 py-10 text-center text-gray-500">
                  No hay cursos.
                  <button
                    onClick={() => navigate("/cursos/create")}
                    className="ml-1 font-medium text-gray-900 underline"
                  >
                    Crea el primero
                  </button>
                </td>
              </tr>
            ) : (
              cursos.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >

                  <td className="px-5 py-3 font-medium text-gray-900">
                    {item.titulo}
                  </td>

                  <td className="px-5 py-3 text-gray-500">
                    {item.duracionHoras} h
                  </td>

                  <td className="px-5 py-3 text-gray-500">
                    {item.precio}
                  </td>

                  <td className="px-5 py-3 text-gray-500">
                    {item.profesor?.nombre}
                  </td>

                  <td className="px-5 py-3">
                    <span className="inline-block rounded-md bg-[#E1F5EE] px-2.5 py-1 text-xs font-bold uppercase text-[#085041]">
                      {item.categoria?.nombre}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-right text-sm">
                    <button
                      onClick={() => navigate(`/cursos/edit/${item.id}`)}
                      className="font-medium text-gray-600 hover:text-gray-900"
                    >
                      Editar
                    </button>

                    <span className="mx-1 text-gray-300">|</span>

                    <button
                      onClick={() => navigate(`/cursos/${item.id}`)}
                      className="font-medium text-gray-600 hover:text-gray-900"
                    >
                      Detalles
                    </button>

                    <span className="mx-1 text-gray-300">|</span>

                    <button
                      onClick={() => navigate(`/cursos/delete/${item.id}`)}
                      className="font-medium text-red-600 hover:text-red-800"
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