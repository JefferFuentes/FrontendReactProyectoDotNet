import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteCurso() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [error, setError] = useState("");

  // 🔹 cargar curso
  useEffect(() => {
    axios
      .get(`http://localhost:5080/api/cursos/${id}`)
      .then(res => setCurso(res.data))
      .catch(() => setError("No se pudo cargar el curso"));
  }, [id]);

  // 🔹 eliminar
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5080/api/cursos/${id}`);
      navigate("/cursos");
    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar curso");
    }
  };

  if (!curso) return <p>Cargando...</p>;

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-red-700">
        Curso
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        ¿Eliminar este curso?
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Esta acción no se puede deshacer.
      </p>

      {error && (
        <div className="mt-4 text-sm text-red-600">{error}</div>
      )}

      {/* Detalles */}
      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="space-y-5">

          <div>
            <p className="text-sm font-medium text-gray-500">Título</p>
            <p className="text-gray-900">{curso.titulo}</p>
          </div>

          <div className="border-t border-red-100 pt-5">
            <p className="text-sm font-medium text-gray-500">Descripción</p>
            <p className="text-gray-900">{curso.descripcion}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-red-100 pt-5">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Duración
              </p>
              <p className="text-gray-900">
                {curso.duracionHoras} horas
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Precio
              </p>
              <p className="text-gray-900">
                {curso.precio}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-red-100 pt-5">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Profesor
              </p>
              <p className="text-gray-900">
                {curso.profesor?.nombre}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Categoría
              </p>
              <p className="text-gray-900">
                {curso.categoria?.nombre}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Botones */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
        >
          Eliminar curso
        </button>

        <button
          onClick={() => navigate("/cursos")}
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}