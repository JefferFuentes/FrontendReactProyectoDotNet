import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteCategoria() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState(null);
  const [error, setError] = useState("");

  // Cargar datos al entrar
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    axios
      .get(`http://localhost:5080/api/categorias/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        // Desestructuramos por si viene envuelto en la respuesta de .NET
        const dataLimpia = res.data.$values || res.data.data || res.data;
        setCategoria(dataLimpia);
      })
      .catch(() => setError("No se pudo cargar la categoría"));
  }, [id]);

  // Eliminar definitivamente
  const handleDelete = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");

      // 🛠️ CORREGIDO: Puerto unificado a 5080 y se añade el Token
      await axios.delete(`http://localhost:5080/api/categorias/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Regresamos al listado general
      navigate("/categorias");

    } catch (err) {
      console.error(err);
      
      const status = err.response?.status;
      const errorData = JSON.stringify(err.response?.data).toLowerCase();

      // Detecta si .NET o SQL Server chillan por la relación del modelo
      if (status === 409 || status === 500 || errorData.includes("foreign") || errorData.includes("relacion")) {
        setError("Categoría relacionada a un curso no se puede eliminar. Elimina primero los cursos asociados.");
      } else {
        setError(err.response?.data?.message || "Error al intentar eliminar la categoría.");
      }
    }
  };

  if (error && !categoria) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!categoria) return <p className="text-center mt-10">Cargando...</p>;

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
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-gray-500">Nombre</p>
            <p className="mt-1 text-gray-900 font-semibold">{categoria.nombre}</p>
          </div>

          <div className="border-t border-red-100 pt-5">
            <p className="text-sm font-medium text-gray-500">Descripción</p>
            <p className="mt-1 text-gray-900">{categoria.descripcion || "Sin descripción."}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700 cursor-pointer"
        >
          Eliminar categoría
        </button>

        <button
          onClick={() => navigate("/categorias")}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}