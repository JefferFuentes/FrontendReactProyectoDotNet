import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EstudianteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [estudiante, setEstudiante] = useState(null);
  const [error, setError] = useState("");

  // 🔹 cargar estudiante
  useEffect(() => {
    axios
      .get(`http://localhost:5080/api/estudiantes/${id}`)
      .then(res => setEstudiante(res.data))
      .catch(() => setError("No se pudo cargar el estudiante"));
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!estudiante) return <p>Cargando...</p>;

  return (
    <div className="mx-auto mt-8 max-w-md">

      {/* Header */}
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#72243E]">
        Estudiante
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        {estudiante.nombre}
      </h1>

      {/* Card */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <div className="space-y-5">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Nombre
            </p>
            <p className="text-gray-900">
              {estudiante.nombre}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-5">
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
          onClick={() => navigate(`/estudiantes/edit/${id}`)}
          className="rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3] hover:bg-[#1e211a]"
        >
          Editar
        </button>

        <button
          onClick={() => navigate("/estudiantes")}
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Volver a la lista
        </button>

      </div>
    </div>
  );
}