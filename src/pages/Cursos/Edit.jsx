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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const cargarDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // 1️⃣ Cargamos de manera segura todo con el token de seguridad
      const [cursoRes, profesoresRes, categoriasRes] = await Promise.all([
        axios.get(`http://localhost:5080/api/cursos/${id}`, config),
        axios.get("http://localhost:5080/api/profesores", config),
        axios.get("http://localhost:5080/api/categorias", config),
      ]);

      const curso = cursoRes.data;

      setTitulo(curso.titulo || "");
      setDescripcion(curso.descripcion || "");
      setDuracionHoras(curso.duracionHoras || "");
      setPrecio(curso.precio || "");
      setProfesorId(curso.profesorId || "");
      setCategoriaId(curso.categoriaId || "");

      // 🔹 Limpieza obligatoria del formato bizarro de .NET ($values)
      const listaProfesores = profesoresRes.data.$values || profesoresRes.data.data || profesoresRes.data;
      const listaCategorias = categoriasRes.data.$values || categoriasRes.data.data || categoriasRes.data;

      setProfesores(Array.isArray(listaProfesores) ? listaProfesores : []);
      setCategorias(Array.isArray(listaCategorias) ? listaCategorias : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      // Si falla la carga (por token expirado o ID inválido) volvemos de manera segura
      navigate("/cursos");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      // 🛠️ SOLUCIÓN: Limpiamos y casteamos el payload exactamente como .NET lo exige
      const payload = {
        id: Number(id),
        titulo: titulo,
        descripcion: descripcion,
        duracionHoras: Number(duracionHoras),
        precio: Number(precio),
        profesorId: Number(profesorId),
        categoriaId: Number(categoriaId)
      };

      await axios.put(`http://localhost:5080/api/cursos/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      navigate("/cursos");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al actualizar curso. Verifique los campos numéricos.");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando datos del curso...</p>;

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
        className="mt-8 space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {error && (
          <div className="text-sm rounded-lg bg-red-50 p-3 text-red-600">{error}</div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            required
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
              required
              value={duracionHoras}
              onChange={(e) => setDuracionHoras(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              required
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Profesor
            </label>
            <select
              required
              value={profesorId}
              onChange={(e) => setProfesorId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
            >
              <option value="">Seleccione un profesor</option>
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
              required
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
            >
              <option value="">Seleccione una categoría</option>
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
            className="rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3] transition hover:bg-[#1e211a] cursor-pointer"
          >
            Guardar cambios
          </button>

          <button
            type="button"
            onClick={() => navigate("/cursos")}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}