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

      setProfesores(profesoresRes.data);
      setCategorias(categoriasRes.data);
    } catch (err) {
      setError("Error al cargar profesores y categorías.");
    }
  };

  const crearCurso = async (curso) => {
    try {
      setError("");

      await axios.post(
        "http://localhost:5080/api/cursos",
        curso
      );

      navigate("/cursos");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Error al crear el curso."
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
        <div className="mt-4 rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <CursoForm
        profesores={profesores}
        categorias={categorias}
        onSubmit={crearCurso}
        textoBoton="Crear curso"
      />

      <div className="mt-4">
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