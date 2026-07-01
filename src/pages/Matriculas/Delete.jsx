import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteMatricula() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [matricula, setMatricula] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const rolRaw = localStorage.getItem("rol") || "";
  
  // Normalizamos roles
  const esAdmin = rolRaw.toLowerCase() === "administrador" || rolRaw.toLowerCase() === "admin";

  useEffect(() => {
    // 🔗 URLs adaptadas con precisión quirúrgica al código de Alejandro
    const url = esAdmin
      ? `http://localhost:5080/api/matriculas/${id}`
      : `http://localhost:5080/api/matriculas/mis-matriculas`; // Sin ID al final para estudiantes

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        // Formato bizarro de .NET ($values)
        const dataLimpia = res.data.$values || res.data.data || res.data;

        if (!esAdmin && Array.isArray(dataLimpia)) {
          // El estudiante se trajo todas sus matrículas, filtramos la que coincide con la URL
          const encontrada = dataLimpia.find(m => m.id === parseInt(id));
          if (encontrada) {
            setMatricula(encontrada);
          } else {
            setError("No se encontró esta matrícula en tus registros.");
          }
        } else {
          // El administrador recibe directamente el objeto individual
          setMatricula(dataLimpia);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar la información de la matrícula.");
      });
  }, [id, esAdmin, token]);

  async function eliminar() {
    try {
      // 🛠️ URLs exactas de Alejandro para dar de baja/eliminar
      const url = esAdmin
        ? `http://localhost:5080/api/matriculas/${id}`
        : `http://localhost:5080/api/matriculas/cancelar/${id}`; // Con ID para ambos

      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Redirección inteligente
      if (esAdmin) {
        navigate("/matriculas");
      } else {
        navigate("/cursos"); // Envía al estudiante a salvo a su catálogo
      }
    } catch (err) {
      console.error(err);
      setError(esAdmin ? "No se pudo eliminar la matrícula." : "No se pudo dar de baja de este curso.");
    }
  }

  if (error) return <p className="text-red-600 p-6">{error}</p>;
  if (!matricula) return <p className="p-6">Cargando datos de matrícula...</p>;

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-red-700">
        Matrícula
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        {esAdmin ? "¿Eliminar esta matrícula?" : "¿Dar de baja este curso?"}
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Esta acción no se puede deshacer.
      </p>

      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="space-y-5">

          <div className="grid grid-cols-2 gap-4">

            {/* 👥 Ocultación 100% efectiva del espacio flotante si es Estudiante */}
            {esAdmin && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Estudiante
                </p>
                <p className="mt-1 text-gray-900 font-semibold">
                  {matricula.usuario?.nombre || "No asignado"}
                </p>
              </div>
            )}

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

        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={eliminar}
          className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700 cursor-pointer"
        >
          {esAdmin ? "Eliminar matrícula" : "Confirmar baja"}
        </button>

        <button
          onClick={() => navigate(esAdmin ? "/matriculas" : "/cursos")}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}