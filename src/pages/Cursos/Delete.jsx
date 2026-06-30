import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteCurso() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    axios
      .get(`http://localhost:5080/api/cursos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const dataLimpia = res.data.$values || res.data.data || res.data;
        setCurso(dataLimpia);
      })
      .catch(() => setError("No se pudo cargar la información del curso."));
  }, [id]);

  const handleDelete = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5080/api/cursos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/cursos");
    } catch (err) {
      setError(err.response?.data?.message || "Error al intentar eliminar el curso. Verifique si tiene estudiantes matriculados.");
    }
  };

  if (error && !curso) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!curso) return <p className="text-center mt-10 text-gray-500">Cargando datos del curso...</p>;

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-red-700">
        Curso
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        ¿Eliminar este curso?
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Esta acción removerá el curso del catálogo permanentemente.
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-gray-500">Título del curso</p>
            <p className="mt-1 text-gray-900 font-semibold">{curso.titulo}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-red-100 pt-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Duración</p>
              <p className="mt-1 text-gray-900">{curso.horas} horas</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Precio</p>
              <p className="mt-1 text-gray-900 font-semibold">₡{curso.precio}</p>
            </div>
          </div>

          <div className="border-t border-red-100 pt-5">
            <p className="text-sm font-medium text-gray-500">Profesor asignado</p>
            <p className="mt-1 text-gray-900">
              {curso.profesor?.nombre || curso.nombreProfesor || "No asignado"}
            </p>
          </div>

          <div className="border-t border-red-100 pt-5">
            <p className="text-sm font-medium text-gray-500">Categoría</p>
            <p className="mt-1 text-gray-900">
              {curso.categoria?.nombre || curso.nombreCategoria || "Sin categoría"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700 cursor-pointer"
        >
          Eliminar curso
        </button>

        <button
          onClick={() => navigate("/cursos")}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}