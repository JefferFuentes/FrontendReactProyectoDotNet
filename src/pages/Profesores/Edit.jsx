import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProfesorForm from "../../components/ProfesorForm";

export default function EditProfesor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    cargarProfesor();
  }, []);

  const cargarProfesor = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5080/api/profesores/${id}`
      );

      setNombre(res.data.nombre);
      setEmail(res.data.email);
      setEspecialidad(res.data.especialidad);
    } catch {
      navigate("/profesores");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(
        `http://localhost:5000/api/profesores/${id}`,
        {
          id,
          nombre,
          email,
          especialidad,
        }
      );

      navigate("/profesores");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al actualizar el profesor"
      );
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#3C3489]">
        Profesor
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Editar profesor
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Modifica los datos del profesor.
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
        submitText="Guardar cambios"
        onCancel={() => navigate("/profesores")}
      />
    </div>
  );
}