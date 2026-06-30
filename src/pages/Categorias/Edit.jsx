import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoriaForm from "../../components/CategoriaForm";

export default function EditCategoria() {
  const navigate = useNavigate();

  const crearCategoria = async (categoria) => {
    await axios.post("http://localhost:5080/api/categorias", categoria);
    navigate("/categorias");
  };

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#085041]">
        Categoría
      </p>

      <h1 className="font-serif text-3xl font-bold text-gray-900">
        Editar categoría
      </h1>

      <CategoriaForm
        initialData={categoria}
        onSubmit={editarCategoria}
        textoBoton="Editar categoría"
      />
    </div>
  );
}