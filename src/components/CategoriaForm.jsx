import { useState } from "react";

export default function CategoriaForm({ initialData, onSubmit, textoBoton }) {
  const [nombre, setNombre] = useState(initialData?.nombre || "");
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      nombre,
      descripcion,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-xl border border-gray-200 bg-white p-6"
    >
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
          Descripción
        </label>

        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3]"
      >
        {textoBoton}
      </button>
    </form>
  );
}