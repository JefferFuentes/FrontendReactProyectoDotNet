import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    try {
      const response = await axios.post("http://localhost:5080/api/account/login", {
        email,
        password,
      });

      // Guardar token
      localStorage.setItem("token", response.data.token);

      // Redirigir
      navigate("/home");

    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.message || "Error al iniciar sesión");
      } else {
        setErrors("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#d9b65c]">
        Cuenta
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Iniciar sesión
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-xl border border-gray-200 bg-white p-6"
      >
        {errors && (
          <div className="text-sm text-red-600">
            {errors}
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#2b2f26] focus:outline-none focus:ring-1 focus:ring-[#2b2f26]"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#2b2f26] focus:outline-none focus:ring-1 focus:ring-[#2b2f26]"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3] transition hover:bg-[#1e211a]"
          >
            Iniciar sesión
          </button>
        </div>

        <p className="text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="font-medium text-gray-900 underline">
            Créala aquí
          </a>
        </p>
      </form>
    </div>
  );
}