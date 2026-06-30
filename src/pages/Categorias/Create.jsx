import { useState } from "react"; // 🔹 Importamos useState para manejar errores
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoriaForm from "../../components/CategoriaForm";
export default function CreateCategoria() {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // 🔹 Estado para capturar alertas de la API

  const crearCategoria = async (categoria) => {
    try {
      setError("");

      // 1️⃣ Recuperamos el token guardado en el localStorage
      const token = localStorage.getItem("token");

      // 2️⃣ Enviamos la petición POST adjuntando el token en los encabezados de autorización
      await axios.post(
        "http://localhost:5080/api/categorias", 
        categoria,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔑 Autorización requerida por .NET
          },
        }
      );

      // Si todo sale bien, volvemos a la lista de categorías
      navigate("/categorias");
    } catch (err) {
      // Si .NET rechaza la petición (por ejemplo, si no eres admin), lo capturamos aquí
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Error al crear la categoría. Asegúrate de estar logueado como Administrador."
      );
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#085041]">
        Categoría
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Nueva categoría
      </h1>

      {/* 🔹 Alerta visual si ocurre un error 401 u otro */}
      {error && (
        <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <CategoriaForm
        onSubmit={crearCategoria}
        textoBoton="Crear categoría"
      />
    </div>
  );
}