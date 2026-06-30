import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EstudianteForm from "../../components/EstudianteForm";

export default function CreateEstudiante() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5080/api/estudiantes", {
        nombre,
        email,
      });

      navigate("/estudiantes");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al crear el estudiante"
      );
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#72243E]">
        Estudiante
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Nuevo estudiante
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Completa los datos para agregarlo.
      </p>

      <EstudianteForm
        nombre={nombre}
        setNombre={setNombre}
        email={email}
        setEmail={setEmail}
        error={error}
        onSubmit={handleSubmit}
        submitText="Ingresar estudiante"
        onCancel={() => navigate("/estudiantes")}
      />
    </div>
  );
}