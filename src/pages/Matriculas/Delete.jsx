import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteMatricula() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [matricula, setMatricula] = useState(null);
    const [error, setError] = useState("");

    // ← agregar estas dos líneas
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    useEffect(() => {
        const url = rol === "Administrador"
            ? `http://localhost:5080/api/matriculas/${id}`
            : `http://localhost:5080/api/matriculas/mis-matriculas/${id}`;

        axios
            .get(url, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => setMatricula(res.data))
            .catch(() => setError("No se pudo cargar la matrícula."));
    }, [id]);

    async function eliminar() {
        try {
            // ← URL distinta según el rol
            const url = rol === "Administrador"
                ? `http://localhost:5080/api/matriculas/${id}`
                : `http://localhost:5080/api/matriculas/cancelar/${id}`;

            await axios.delete(url, {
                headers: { Authorization: `Bearer ${token}` }  // ← agregar
            });

            navigate("/matriculas");
        } catch {
            setError("No se pudo eliminar la matrícula.");
        }
    }

  if (!matricula) return <p>Cargando...</p>;

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-red-700">
        Matrícula
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        ¿Eliminar esta matrícula?
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Esta acción no se puede deshacer.
      </p>

      {error && (
        <p className="mt-4 text-red-600">{error}</p>
      )}

      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="space-y-5">

          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Estudiante
              </p>

              <p className="mt-1 text-gray-900">
                {matricula.usuario?.nombre}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Curso
              </p>

              <p className="mt-1 text-gray-900">
                {matricula.curso?.titulo}
              </p>
            </div>

          </div>

          <div className="border-t border-red-100 pt-5">
            <p className="text-sm font-medium text-gray-500">
              Fecha de inscripción
            </p>

            <p className="mt-1 text-gray-900">
              {new Date(matricula.fechaInscripcion).toLocaleDateString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-red-100 pt-5">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Estado
              </p>

              {matricula.pagado ? (
                <span className="inline-block rounded-md bg-[#EAF3DE] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#27500A]">
                  Pagado
                </span>
              ) : (
                <span className="inline-block rounded-md bg-gray-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-gray-600">
                  Pendiente
                </span>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Monto
              </p>

              <p className="mt-1 text-gray-900">
                ₡{matricula.monto}
              </p>
            </div>

          </div>

          <div className="border-t border-red-100 pt-5">
            <p className="text-sm font-medium text-gray-500">
              Fecha de pago
            </p>

            <p className="mt-1 text-gray-900">
              {matricula.fechaPago
                ? new Date(matricula.fechaPago).toLocaleDateString()
                : "Sin registrar"}
            </p>
          </div>

        </div>
      </div>

      <div className="mt-6 flex gap-4">

              <button
                  onClick={eliminar}
                  className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
              >
                  {rol === "Administrador" ? "Eliminar matrícula" : "Dar de baja"}
              </button>

        <button
          onClick={() => navigate("/matriculas")}
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}