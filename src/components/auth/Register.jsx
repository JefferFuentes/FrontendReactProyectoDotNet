import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5080/api/account/register", {
        nombre,
        email,
        password
      });

      setSuccess("Cuenta creada correctamente");

      // opcional: redirigir al login
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      setError(
        err.response?.data?.mensaje ||
        "Error al crear la cuenta"
      );
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#d9b65c]">
        Cuenta
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Crear cuenta
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Regístrate para acceder a la plataforma.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-xl border border-gray-200 bg-white p-6"
      >
        {error && (
          <div className="text-sm text-red-600">{error}</div>
        )}

        {success && (
          <div className="text-sm text-green-600">{success}</div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nombre
          </label>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
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
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3] hover:bg-[#1e211a]"
        >
          Crear cuenta
        </button>

        <p className="text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="font-medium underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}