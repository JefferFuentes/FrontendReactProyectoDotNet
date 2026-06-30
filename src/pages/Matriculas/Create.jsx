import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateMatricula() {
  const navigate = useNavigate();

  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);

  const [estudianteId, setEstudianteId] = useState("");
  const [cursoId, setCursoId] = useState("");
  const [fechaInscripcion, setFechaInscripcion] = useState("");
  const [pagado, setPagado] = useState(false);
  const [fechaPago, setFechaPago] = useState("");
  const [monto, setMonto] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const [estudiantesRes, cursosRes] = await Promise.all([
        axios.get("http://localhost:5080/api/estudiantes"),
        axios.get("http://localhost:5080/api/cursos")
      ]);

      setEstudiantes(estudiantesRes.data);
      setCursos(cursosRes.data);
    } catch {
      setError("No se pudieron cargar los datos.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5080/api/matriculas", {
        estudianteId,
        cursoId,
        fechaInscripcion,
        pagado,
        fechaPago: pagado ? fechaPago : null,
        monto: pagado ? monto : 0
      });

      navigate("/matriculas");
    } catch {
      setError("No se pudo registrar la matrícula.");
    }
  }

  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#633806]">
        Matrícula
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Nueva matrícula
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Registra la inscripción de un estudiante a un curso.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-xl border border-gray-200 bg-white p-6"
      >
        {error && (
          <p className="text-red-600">{error}</p>
        )}

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="mb-1 block text-sm font-medium">
              Estudiante
            </label>

            <select
              value={estudianteId}
              onChange={(e) => setEstudianteId(e.target.value)}
              className="w-full rounded-lg border p-2"
            >
              <option value="">Seleccione...</option>

              {estudiantes.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Curso
            </label>

            <select
              value={cursoId}
              onChange={(e) => setCursoId(e.target.value)}
              className="w-full rounded-lg border p-2"
            >
              <option value="">Seleccione...</option>

              {cursos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.titulo}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Fecha de inscripción
          </label>

          <input
            type="date"
            value={fechaInscripcion}
            onChange={(e) => setFechaInscripcion(e.target.value)}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={pagado}
              onChange={(e) => setPagado(e.target.checked)}
            />
            Pagado
          </label>

          <div className="mt-4 grid grid-cols-2 gap-4">

            <div>
              <label className="mb-1 block text-sm font-medium">
                Fecha de pago
              </label>

              <input
                type="date"
                value={fechaPago}
                disabled={!pagado}
                onChange={(e) => setFechaPago(e.target.value)}
                className="w-full rounded-lg border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Monto
              </label>

              <input
                type="number"
                step="0.01"
                value={monto}
                disabled={!pagado}
                onChange={(e) => setMonto(e.target.value)}
                className="w-full rounded-lg border p-2"
              />
            </div>

          </div>

        </div>

        <div className="flex gap-3 pt-2">

          <button
            type="submit"
            className="rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3]"
          >
            Registrar matrícula
          </button>

          <button
            type="button"
            onClick={() => navigate("/matriculas")}
            className="text-sm font-medium text-gray-500"
          >
            Cancelar
          </button>

        </div>

      </form>
    </div>
  );
}