import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function PagoExitoso() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [estado, setEstado] = useState("procesando");

  useEffect(() => {
    capturarPago();
  }, []);

  const capturarPago = async () => {
    try {
      const token = localStorage.getItem("token");

      // PayPal manda token en URL
      const tokenPago = searchParams.get("token");

      if (!tokenPago) {
        setEstado("error");
        return;
      }

      await axios.post(
        "http://localhost:5080/api/paypal/capture-order",
        {
          orderId: tokenPago
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEstado("exitoso");

      // 👇 redirección automática a matrículas
      setTimeout(() => {
        navigate("/matriculas");
      }, 2000);
    } catch (err) {
      console.error(err);
      setEstado("error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white shadow-sm border rounded-xl p-10 text-center">
        {estado === "procesando" && (
          <h1 className="text-2xl font-bold">
            Procesando pago...
          </h1>
        )}

        {estado === "exitoso" && (
          <>
            <h1 className="text-3xl font-bold text-green-600">
              Pago exitoso 🎉
            </h1>
            <p className="mt-3 text-slate-600">
              Redirigiendo a tus matrículas...
            </p>
          </>
        )}

        {estado === "error" && (
          <>
            <h1 className="text-3xl font-bold text-red-600">
              Error en el pago
            </h1>

            <button
              onClick={() => navigate("/cursos")}
              className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Volver a cursos
            </button>
          </>
        )}
      </div>
    </div>
  );
}
