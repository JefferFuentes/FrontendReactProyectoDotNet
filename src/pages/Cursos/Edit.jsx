import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCurso() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracionHoras, setDuracionHoras] = useState("");
  const [precio, setPrecio] = useState("");
  const [profesorId, setProfesorId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const [profesores, setProfesores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [cursoRes, profesoresRes, categoriasRes] = await Promise.all([
        axios.get(`http://localhost:5080/api/cursos/${id}`),
        axios.get("http://localhost:5080/api/profesores"),
        axios.get("http://localhost:5080/api/categorias"),
      ]);

      const curso = cursoRes.data;

      setTitulo(curso.titulo);
      setDescripcion(curso.descripcion);
      setDuracionHoras(curso.duracionHoras);
      setPrecio(curso.precio);
      setProfesorId(curso.profesorId);
      setCategoriaId(curso.categoriaId);

      setProfesores(profesoresRes.data);
      setCategorias(categoriasRes.data);
    } catch {
      navigate("/cursos");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(`http://localhost:5080/api/cursos/${id}`, {
        id,
        titulo,
        descripcion,
        duracionHoras,
        precio,
        profesorId,
        categoriaId,
      });

      navigate("/cursos");
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar curso");
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#712B13]">
        Curso
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Editar curso
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-xl border border-gray-200 bg-white p-6"
      >
        {error && (
          <div className="text-sm text-red-600">{error}</div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Título
          </label>

          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#2b2f26] focus:outline-none focus:ring-1 focus:ring-[#2b2f26]"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Descripción
          </label>

          <input
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#2b2f26] focus:outline-none focus:ring-1 focus:ring-[#2b2f26]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Duración (horas)
            </label>

            <input
              type="number"
              value={duracionHoras}
              onChange={(e) => setDuracionHoras(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Precio
            </label>

            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Profesor
            </label>

            <select
              value={profesorId}
              onChange={(e) => setProfesorId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
            >
              {profesores.map((profesor) => (
                <option key={profesor.id} value={profesor.id}>
                  {profesor.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Categoría
            </label>

            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3] transition hover:bg-[#1e211a]"
          >
            Guardar cambios
          </button>

          <button
            type="button"
            onClick={() => navigate("/cursos")}
            className="text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}