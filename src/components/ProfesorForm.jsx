export default function ProfesorForm({
  nombre,
  setNombre,
  email,
  setEmail,
  error,
  onSubmit,
  submitText,
  onCancel,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 space-y-5 rounded-xl border border-gray-200 bg-white p-6"
    >
      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Nombre */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Nombre
        </label>

        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#2b2f26] focus:outline-none focus:ring-1 focus:ring-[#2b2f26]"
        />
      </div>

      {/* Email */}
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

      {/* Botones */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-[#2b2f26] px-5 py-2.5 font-semibold text-[#f4efe3] transition hover:bg-[#1e211a] cursor-pointer"
        >
          {submitText}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}