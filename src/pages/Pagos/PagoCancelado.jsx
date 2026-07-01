import { useNavigate } from "react-router-dom";

export default function PagoCancelado() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white shadow-sm border rounded-xl p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Pago cancelado
        </h1>

        <p className="mt-4 text-slate-600">
          No se realizó ningún cargo.
        </p>

        <button
          onClick={() => navigate("/cursos")}
          className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Volver a cursos
        </button>
      </div>
    </div>
  );
}
