import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // 1. Importamos el decodificador

import Navbar from "../../components/layout/Navbar";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // 2. Decodificamos el JWT para extraer los datos que se guardó
        const decoded = jwtDecode(token);
        
        // 3. Extraemos el Claim de Rol exacto que genera .NET Core
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        console.log("Rol detectado en Home:", role);

        // 4. Si la cuenta es de un estudiante, lo mandamos directo a su sección
        if (role === "Estudiante" || role === "Estudiante") {
          navigate("/cursos");
        }
      } catch (error) {
        console.error("Error al leer el token en el Home:", error);
      }
    }
  }, [navigate]);

  return (
    <>
      {/* HERO */}
      <div className="relative mt-6 overflow-hidden rounded-2xl bg-[#2b2f26] px-8 py-16 sm:px-12">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(244,239,227,0.05)_0px,rgba(244,239,227,0.05)_1px,transparent_1px,transparent_48px)]"></div>

        <div className="relative max-w-xl">
          <p className="mb-2 font-serif text-lg italic text-[#d9b65c]">
            Plataforma de cursos
          </p>

          <h1 className="font-serif text-4xl font-bold leading-tight text-[#f4efe3] sm:text-5xl">
            Lo que se aprende, se organiza bien.
          </h1>

          <p className="mt-4 max-w-md text-[#c9c2ab]">
            Cursos, profesores, categorías y matrículas en un solo lugar.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/cursos")}
              className="rounded-lg bg-[#d9b65c] px-5 py-2.5 font-semibold text-[#2b2f26] transition hover:bg-[#c7a44e]"
            >
              Ver cursos
            </button>

            <button
              onClick={() => navigate("/matriculas/create")}
              className="rounded-lg border border-[#6b6a5a] px-5 py-2.5 font-semibold text-[#f4efe3] transition hover:border-[#8a8973] hover:bg-white/5"
            >
              Registrar matrícula
            </button>
          </div>
        </div>
      </div>

      {/* MÓDULOS */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-gray-900">
          Módulos
        </h2>

        <p className="mb-6 text-gray-500">
          Entra directo a lo que necesitas gestionar.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Tarjeta Cursos */}
          <button
            onClick={() => navigate("/cursos")}
            className="rounded-xl border border-gray-200 bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-[#2b2f26]"
          >
            <span className="mb-3 inline-block rounded-md bg-[#FAECE7] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#712B13]">
              Cursos
            </span>
            <p className="mb-1 text-lg font-semibold text-gray-900">
              Catálogo de cursos
            </p>
            <p className="text-sm text-gray-500">
              Título, descripción, duración, precio y profesor a cargo.
            </p>
          </button>

          {/* Tarjeta Categorías */}
          <button
            onClick={() => navigate("/categorias")}
            className="rounded-xl border border-gray-200 bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-[#2b2f26]"
          >
            <span className="mb-3 inline-block rounded-md bg-[#E1F5EE] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#085041]">
              Categorías
            </span>
            <p className="mb-1 text-lg font-semibold text-gray-900">
              Categorías
            </p>
            <p className="text-sm text-gray-500">
              Cómo se clasifican los cursos dentro de la plataforma.
            </p>
          </button>

          {/* Tarjeta Profesores */}
          <button
            onClick={() => navigate("/profesores")}
            className="rounded-xl border border-gray-200 bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-[#2b2f26]"
          >
            <span className="mb-3 inline-block rounded-md bg-[#EEEDFE] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#3C3489]">
              Profesores
            </span>
            <p className="mb-1 text-lg font-semibold text-gray-900">
              Profesores
            </p>
            <p className="text-sm text-gray-500">
              Quién imparte cada curso y sus datos de contacto.
            </p>
          </button>

          {/* Tarjeta Estudiantes */}
          <button
            onClick={() => navigate("/estudiantes")}
            className="rounded-xl border border-gray-200 bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-[#2b2f26]"
          >
            <span className="mb-3 inline-block rounded-md bg-[#FBEAF0] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#72243E]">
              Estudiantes
            </span>
            <p className="mb-1 text-lg font-semibold text-gray-900">
              Estudiantes
            </p>
            <p className="text-sm text-gray-500">
              Registro de las personas inscritas en la plataforma.
            </p>
          </button>

          {/* Tarjeta Matrículas */}
          <button
            onClick={() => navigate("/matriculas")}
            className="rounded-xl border border-gray-200 bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-[#2b2f26]"
          >
            <span className="mb-3 inline-block rounded-md bg-[#FAEEDA] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#633806]">
              Matrículas
            </span>
            <p className="mb-1 text-lg font-semibold text-gray-900">
              Matrículas
            </p>
            <p className="text-sm text-gray-500">
              Quién pagó qué curso, cuándo y por cuánto.
            </p>
          </button>

        </div>
      </div>
    </>
  );
}