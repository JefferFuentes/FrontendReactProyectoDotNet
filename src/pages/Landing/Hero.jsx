// pages/Landing/Hero.jsx

import { Link } from "react-router-dom";
import {
    FaGraduationCap,
    FaArrowRight,
    FaCircleCheck,
    FaPaypal,
} from "react-icons/fa6";

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-20 md:py-28">

            {/* Fondos decorativos */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

            <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* Texto */}
                <div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-900 px-4 py-2 font-medium">

                        <FaGraduationCap />

                        <span>Plataforma Educativa Moderna</span>

                    </div>

                    <h1 className="mt-8 text-5xl lg:text-6xl font-bold leading-tight text-gray-900">

                        Aprende hoy.
                        <br />

                        Paga de forma segura.

                        <span className="block text-blue-900">
                            Crece profesionalmente.
                        </span>

                    </h1>

                    <p className="mt-8 text-xl leading-8 text-gray-600 max-w-xl">

                        Encuentra cursos impartidos por profesores
                        especializados y matricúlate en pocos minutos
                        mediante una pasarela de pago segura con PayPal.

                    </p>

                    {/* Botones */}
                    <div className="mt-10 flex flex-wrap gap-4">

                        <Link to="/login">

                            <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all hover:-translate-y-1">

                                Iniciar Sesión

                                <FaArrowRight />

                            </button>

                        </Link>

                        <button className="px-6 py-3 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition">

                            Ver Cursos

                        </button>

                    </div>

                    {/* Badges */}
                    <div className="mt-10 flex flex-wrap gap-6 text-gray-600">

                        <div className="flex items-center gap-2">

                            <FaCircleCheck className="text-green-600" />

                            <span>Pago Seguro</span>

                        </div>

                        <div className="flex items-center gap-2">

                            <FaCircleCheck className="text-green-600" />

                            <span>Acceso Inmediato</span>

                        </div>

                    </div>

                </div>

                {/* Imagen */}
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">

                    <img
                        src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1674&auto=format&fit=crop"
                        alt="Equipo de estudiantes trabajando"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Tarjeta flotante */}
                    <div
                        className="absolute bottom-8 right-8 bg-white rounded-2xl shadow-xl border border-gray-200 px-5 py-4 flex items-center gap-4 animate-bounce"
                        style={{ animationDuration: "3s" }}
                    >

                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">

                            <FaPaypal
                                size={24}
                                className="text-blue-700"
                            />

                        </div>

                        <div>

                            <p className="text-sm text-gray-500">
                                Pago Seguro
                            </p>

                            <p className="font-semibold text-gray-900">
                                PayPal Verificado
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}
