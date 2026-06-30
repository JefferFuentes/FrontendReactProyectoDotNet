import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteCategoria() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState(null);
  const [error, setError] = useState("");

  // Cargar datos
  useEffect(() => {
    axios
      .get(`http://localhost:5080/api/categorias/${id}`)
      .then(res => setCategoria(res.data))
      .catch(() => setError("No se pudo cargar la categoría"));
  }, [id]);

  // Eliminar
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/categorias/${id}`);

      navigate("/categorias");

    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar");
    }
  };

  if (!categoria) return <p>Cargando...</p>;

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-red-700">
        Categoría
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        ¿Eliminar esta categoría?
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Esta acción no se puede deshacer.
      </p>

      {error && (
        <div className="mt-4 text-sm text-red-600">{error}</div>
      )}

      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Nombre
            </p>
            <p className="mt-1 text-gray-900">
              {categoria.nombre}
            </p>
          </div>

          <div className="border-t border-red-100 pt-5">
            <p className="text-sm font-medium text-gray-500">
              Descripción
            </p>
            <p className="mt-1 text-gray-900">
              {categoria.descripcion}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
        >
          Eliminar categoría
        </button>

        <button
          onClick={() => navigate("/categorias")}
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}