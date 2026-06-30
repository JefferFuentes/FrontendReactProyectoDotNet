import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProfesorForm from "../../components/ProfesorForm";

export default function EditProfesor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProfesor = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5080/api/profesores/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const dataLimpia = res.data.$values || res.data.data || res.data;

        setNombre(dataLimpia.nombre || "");
        setEmail(dataLimpia.email || "");
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/profesores");
      }
    };

    cargarProfesor();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      const payload = {
        id: Number(id),
        nombre: nombre,
        email: email
      };

      await axios.put(`http://localhost:5080/api/profesores/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      navigate("/profesores");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al actualizar el profesor.");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando datos del profesor...</p>;

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

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      <ProfesorForm
        nombre={nombre}
        setNombre={setNombre}
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmit}
        submitText="Guardar cambios"
        onCancel={() => navigate("/profesores")}
      />
    </div>
  );
}