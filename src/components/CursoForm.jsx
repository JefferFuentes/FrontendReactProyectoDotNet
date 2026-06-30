import { useState } from "react";

export default function CursoForm({
  initialData = {},
  profesores = [],
  categorias = [],
  onSubmit,
  textoBoton,
}) {
  const [titulo, setTitulo] = useState(initialData.titulo || "");
  const [descripcion, setDescripcion] = useState(initialData.descripcion || "");
  const [duracionHoras, setDuracionHoras] = useState(
    initialData.duracionHoras || ""
  );
  const [precio, setPrecio] = useState(initialData.precio || "");
  const [profesorId, setProfesorId] = useState(
    initialData.profesorId || ""
  );
  const [categoriaId, setCategoriaId] = useState(
    initialData.categoriaId || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      titulo,
      descripcion,
      duracionHoras: Number(duracionHoras),
      precio: Number(precio),
      profesorId: Number(profesorId),
      categoriaId: Number(categoriaId),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-xl border border-gray-200 bg-white p-6"
    >
      {/* Título */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Título
        </label>

        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#2b2f26] focus:outline-none focus:ring-1 focus:ring-[#2b2f26]"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Descripción
        </label>

        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#2b2f26] focus:outline-none focus:ring-1 focus:ring-[#2b2f26]"
        />
      </div>

      {/* Duración y Precio */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Duración (horas)
          </label>

          <input
            type="number"
            value={duracionHoras}
            onChange={(e) => setDuracionHoras(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#2b2f26] focus:outline-none focus:ring-1 focus:ring-[#2b2f26]"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Precio
          </label>

          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#2b2f26] focus:outline-none focus:ring-1 focus:ring-[#2b2f26]"
          />
        </div>
      </div>

      {/* Profesor y Categoría */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Profesor
          </label>

          <select
            value={profesorId}
            onChange={(e) => setProfesorId(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-[#2b2f26] focus:outline-none focus:ring-1 focus:ring-[#2b2f26]"
          >
            <option value="">Seleccione un profesor</option>

            {profesores.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Categoría
          </label>

          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-[#2b2f26] focus:outline-none focus:ring-1 focus:ring-[#2b2f26]"
          >
            <option value="">Seleccione una categoría</option>

            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3] transition hover:bg-[#1e211a]"
        >
          {textoBoton}
        </button>
      </div>
    </form>
  );
}