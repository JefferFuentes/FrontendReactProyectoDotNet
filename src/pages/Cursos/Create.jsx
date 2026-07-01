import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CursoForm from "../../components/CursoForm";

export default function CreateCurso() {
  const navigate = useNavigate();

  const [profesores, setProfesores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [profesoresRes, categoriasRes] = await Promise.all([
        axios.get("http://localhost:5080/api/profesores"),
        axios.get("http://localhost:5080/api/categorias"),
      ]);

      // 🔹 Extraemos los arreglos correctamente si vienen envueltos en $values o data
      const listaProfesores = profesoresRes.data.$values || profesoresRes.data.data || profesoresRes.data;
      const listaCategorias = categoriasRes.data.$values || categoriasRes.data.data || categoriasRes.data;

      setProfesores(Array.isArray(listaProfesores) ? listaProfesores : []);
      setCategorias(Array.isArray(listaCategorias) ? listaCategorias : []);
    } catch (err) {
      setError("Error al cargar los selectores de profesores y categorías.");
    }
  };

  const crearCurso = async (curso) => {
    try {
      setError("");

      // 1. Recuperamos el token de autenticación que guardó el Login
      const token = localStorage.getItem("token");

      // 2. Enviamos la petición incluyendo los encabezados de autorización requeridos por .NET
      await axios.post(
        "http://localhost:5080/api/cursos",
        curso,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Si todo sale bien, regresa a la lista adaptada
      navigate("/cursos");
    } catch (err) {
      // Capturamos el mensaje de error exacto que devuelva el servidor
      setError(
        err.response?.data?.message ||
        "Error al crear el curso. Asegúrate de tener permisos de Administrador."
      );
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#712B13]">
        Curso
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Nuevo curso
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Completa los datos para agregarlo al catálogo.
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-100 p-3 text-red-700 text-sm">
          {error}
        </div>
      )}
    <div className="mt-4">
      <CursoForm
        profesores={profesores}
        categorias={categorias}
        onSubmit={crearCurso}
        textoBoton="Crear curso"
      />

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