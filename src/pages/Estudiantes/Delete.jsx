import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteEstudiante() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [estudiante, setEstudiante] = useState(null);
  const [error, setError] = useState("");

  // 🔹 cargar estudiante
  useEffect(() => {
    axios
      .get(`http://localhost:5080/api/usuarios/${id}`)
      .then(res => setEstudiante(res.data))
      .catch(() => setError("No se pudo cargar el estudiante"));
  }, [id]);

  // 🔹 eliminar
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5080/api/usuarios/${id}`);
      navigate("/estudiantes");
    } catch {
      setError("Error al eliminar estudiante");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;
  if (!estudiante) return <p>Cargando...</p>;

  return (
    <div className="mx-auto mt-8 max-w-md">

      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-red-700">
        Estudiante
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        ¿Dar de baja a este estudiante?
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Esta acción no se puede deshacer.
      </p>

      {/* Card */}
      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="space-y-5">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Nombre
            </p>
            <p className="text-gray-900">
              {estudiante.nombre}
            </p>
          </div>

          <div className="border-t border-red-100 pt-5">
            <p className="text-sm font-medium text-gray-500">
              Email
            </p>
            <p className="text-gray-900">
              {estudiante.email}
            </p>
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex items-center gap-4">

        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
        >
          Eliminar estudiante
        </button>

        <button
          onClick={() => navigate("/estudiantes")}
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}