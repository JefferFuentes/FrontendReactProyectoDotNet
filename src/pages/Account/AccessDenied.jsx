import { useNavigate } from "react-router-dom";

export default function AccessDeniedPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto mt-16 max-w-md text-center">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-red-700">
        Acceso denegado
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        No tienes permiso para ver esto
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Esta sección está reservada para administradores.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 inline-block rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3] transition hover:bg-[#1e211a]"
      >
        Volver al inicio
      </button>
    </div>
  );
}