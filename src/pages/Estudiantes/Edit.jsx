import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EstudianteForm from "../../components/EstudianteForm";

export default function EditEstudiante() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    cargarEstudiante();
  }, []);

  const cargarEstudiante = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5080/api/usuarios/${id}`
      );

      setNombre(res.data.nombre);
      setEmail(res.data.email);
    } catch {
      navigate("/estudiantes");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(
        `http://localhost:5080/api/estudiantes/${id}`,
        {
          id,
          nombre,
          email,
        }
      );

      navigate("/estudiantes");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al actualizar el estudiante"
      );
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#72243E]">
        Estudiante
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Editar estudiante
      </h1>

      <EstudianteForm
        nombre={nombre}
        setNombre={setNombre}
        email={email}
        setEmail={setEmail}
        error={error}
        onSubmit={handleSubmit}
        submitText="Guardar cambios"
        onCancel={() => navigate("/estudiantes")}
      />
    </div>
  );
}