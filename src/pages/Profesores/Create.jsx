import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfesorForm from "../../components/ProfesorForm";

export default function CreateProfesor() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5080/api/profesores", {
        nombre,
        email,
        especialidad,
      });

      navigate("/profesores");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al crear el profesor"
      );
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#3C3489]">
        Profesor
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Nuevo profesor
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Completa los datos para registrarlo.
      </p>

      <ProfesorForm
        nombre={nombre}
        setNombre={setNombre}
        email={email}
        setEmail={setEmail}
        especialidad={especialidad}
        setEspecialidad={setEspecialidad}
        error={error}
        onSubmit={handleSubmit}
        submitText="Crear profesor"
        onCancel={() => navigate("/profesores")}
      />
    </div>
  );
}