import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteProfesor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profesor, setProfesor] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    axios
      .get(`http://localhost:5080/api/profesores/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const dataLimpia = res.data.$values || res.data.data || res.data;
        setProfesor(dataLimpia);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar la información del profesor.");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5080/api/profesores/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/profesores");
    } catch (err) {
      console.error("Error al eliminar:", err);
      const status = err.response?.status;
      const dataBackend = err.response?.data;
      const stringData = dataBackend ? JSON.stringify(dataBackend).toLowerCase() : "";

      if (status === 409 || status === 500 || stringData.includes("foreign") || stringData.includes("reference")) {
        setError("No se puede eliminar el profesor porque tiene cursos asignados.");
      } else {
        setError(dataBackend?.message || "Error inesperado al intentar eliminar el profesor.");
      }
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500 font-medium">Cargando datos del profesor...</p>;
  if (!profesor && error) return <p className="text-center mt-10 text-red-600 font-medium">{error}</p>;

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-red-700">
        Profesor
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        ¿Eliminar este profesor?
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Esta acción no se puede deshacer.
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {profesor && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Nombre completo</p>
              <p className="mt-1 text-gray-900 font-semibold">{profesor.nombre || "Sin nombre"}</p>
            </div>

            <div className="border-t border-red-100 pt-5">
              <p className="text-sm font-medium text-gray-500">Correo electrónico</p>
              <p className="mt-1 text-gray-900">{profesor.email || "Sin correo"}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700 cursor-pointer"
        >
          Eliminar profesor
        </button>

        <button
          onClick={() => navigate("/profesores")}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}