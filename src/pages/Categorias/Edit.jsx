import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CategoriaForm from "../../components/CategoriaForm"; // Importación directa correcta

export default function EditCategoria() {
  const { id } = useParams(); // 🔹 Capturamos el id de la URL
  const navigate = useNavigate();
  
  const [categoria, setCategoria] = useState(null); // 🔹 Estado para los datos iniciales
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // 1️⃣ Cargar los datos de la categoría actual para que aparezcan en los inputs
  useEffect(() => {
    const cargarCategoria = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5080/api/categorias/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Limpiamos el formato de .NET por si viene envuelto
        const dataLimpia = res.data.$values || res.data.data || res.data;
        setCategoria(dataLimpia);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la categoría para editar.");
        setLoading(false);
      }
    };

    cargarCategoria();
  }, [id]);

  // 2️⃣ Enviar los datos actualizados mediante PUT
 // En src/pages/Categorias/Edit.jsx
  const editarCategoria = async (valoresActualizados) => {
    try {
      setError("");
      const token = localStorage.getItem("token");

      // 🛠️ SOLUCIÓN: Creamos un objeto limpio con el ID explícito convertido a número
      // y nos aseguramos de que coincida con lo que espera el Backend
      const payload = {
        id: Number(id), // Oblzamos a que sea numérico igual que en el parámetro de la URL
        nombre: valoresActualizados.nombre,
        descripcion: valoresActualizados.descripcion
      };

      // Enviamos el PUT con el payload estructurado
      await axios.put(
        `http://localhost:5080/api/categorias/${id}`, 
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      navigate("/categorias");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al actualizar la categoría. Revisa las validaciones.");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando datos de la categoría...</p>;

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#085041]">
        Categoría
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Editar categoría
      </h1>

      {error && (
        <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* 3️⃣ Renderizamos el formulario solo cuando ya tengamos los datos cargados */}
      {categoria && (
        <CategoriaForm
          initialData={categoria}
          onSubmit={editarCategoria}
          textoBoton="Guardar cambios"
        />
      )}
    </div>
  );
}