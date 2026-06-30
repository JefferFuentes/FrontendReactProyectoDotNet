import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function DetailsCurso() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5080/api/cursos/${id}`)
      .then((res) => {
        setCurso(res.data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/cursos");
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Cargando...
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#712B13]">
        Curso
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        {curso.titulo}
      </h1>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <dl className="space-y-5">

          <div>
            <dt className="text-sm font-medium text-gray-500">
              Descripción
            </dt>
            <dd className="mt-1 text-gray-900">
              {curso.descripcion}
            </dd>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Duración
              </dt>

              <dd className="mt-1 text-gray-900">
                {curso.duracionHoras} horas
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Precio
              </dt>

              <dd className="mt-1 text-gray-900">
                ₡ {curso.precio}
              </dd>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Profesor
              </dt>

              <dd className="mt-1 text-gray-900">
                {curso.profesor?.nombre}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Categoría
              </dt>

              <dd className="mt-1 text-gray-900">
                {curso.categoria?.nombre}
              </dd>
            </div>

          </div>

        </dl>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Link
          to={`/cursos/edit/${curso.id}`}
          className="rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3] transition hover:bg-[#1e211a]"
        >
          Editar
        </Link>

        <Link
          to="/cursos"
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Volver a la lista
        </Link>
      </div>
    </div>
  );
}