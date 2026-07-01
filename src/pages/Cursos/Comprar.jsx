// src/pages/Cursos/Comprar.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Comprar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCurso();
  }, []);

  const cargarCurso = async () => {
    try {
      const res = await axios.get(`http://localhost:5080/api/cursos/${id}`);
      setCurso(res.data);
    } catch (err) {
      alert("Curso no encontrado");
      navigate("/cursos");
    } finally {
      setLoading(false);
    }
  };

  const pagar = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5080/api/paypal/create-order",
        {
          cursoId: curso.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const approve = res.data.links.find((l) => l.rel === "approve");

      window.location.href = approve.href;
    } catch (err) {
      alert("Error al iniciar pago");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <p className="text-slate-600">Cargando curso...</p>
      </div>
    );
  }

  if (!curso) return null;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* NAV */}
      <nav className="bg-slate-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-white text-2xl font-bold">
            Pasarela de Pagos
          </h1>

          <button
            onClick={() => navigate("/cursos")}
            className="text-blue-300 hover:underline"
          >
            ← Volver
          </button>
        </div>
      </nav>

      {/* CARD */}
      <div className="max-w-3xl mx-auto mt-10">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-3xl font-bold mb-4">
            {curso.titulo}
          </h2>

          <p className="text-slate-600 mb-6">
            {curso.descripcion}
          </p>

          <div className="space-y-2 text-slate-700">
            <p>
              <strong>Profesor:</strong> {curso.profesor?.nombre}
            </p>

            <p>
              <strong>Categoría:</strong> {curso.categoria?.nombre}
            </p>

            <p>
              <strong>Duración:</strong> {curso.duracionHoras} horas
            </p>

            <p>
              <strong>Precio:</strong> ${curso.precio}
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={pagar}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg transition"
            >
              Pagar con PayPal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
