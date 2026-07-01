import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MatriculasList() {
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const rol = localStorage.getItem("rol");

        const url = rol === "Administrador"
            ? "http://localhost:5080/api/Matriculas"
            : "http://localhost:5080/api/Matriculas/mis-matriculas";

        axios
            .get(url, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                setMatriculas(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Status:", err.response?.status);
                console.log("Error:", err.response?.data);
                setError("Error: " + err.response?.status);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>; // ← agregar esto

  return (
    <div className="mt-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#72243E]">
            Matrícula
          </p>

          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Matrículas
          </h1>
        </div>

      </div>

      {/* Error */}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-5 py-3 text-sm font-medium text-gray-500">
                Estudiante
              </th>
              <th className="px-5 py-3 text-sm font-medium text-gray-500">
                Curso
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {matriculas.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-5 py-10 text-center text-gray-500">
                  No hay matrículas
                </td>
              </tr>
            ) : (
              matriculas.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {item.usuario?.nombre}
                  </td>

                  <td className="px-5 py-3 text-gray-500">
                    {item.curso?.titulo}
                  </td>

                  <td className="px-5 py-3 text-right text-sm">


                    <span className="mx-1 text-gray-300">|</span>

                    <button
                      onClick={() => navigate(`/matriculas/delete/${item.id}`)}
                      className="font-medium text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}