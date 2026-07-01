// pages/Landing/Features.jsx

import { FaAward, FaShieldHalved, FaBolt } from "react-icons/fa6";

export default function Features() {
    return (
        <section className="bg-gray-50 py-20 border-y border-gray-200">

            <div className="max-w-7xl mx-auto px-6">

                {/* Título */}
                <div className="text-center mb-16">

                    <h2 className="text-4xl font-bold text-gray-900">
                        ¿Por qué elegir EduPay Academy?
                    </h2>

                    <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-600">
                        Nuestra plataforma está diseñada para ofrecer la mejor
                        experiencia educativa, combinando contenido de alta
                        calidad con un proceso de matrícula sin fricciones.
                    </p>

                </div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-3">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                            <FaAward
                                size={28}
                                className="text-blue-900"
                            />
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Cursos de Calidad
                        </h3>

                        <p className="text-gray-600 leading-7">
                            Cursos impartidos por profesores especializados,
                            diseñados para impulsar tu carrera profesional con
                            contenido actualizado y práctico.
                        </p>

                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                        <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-6">
                            <FaShieldHalved
                                size={28}
                                className="text-amber-600"
                            />
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Pago Seguro
                        </h3>

                        <p className="text-gray-600 leading-7">
                            Integración total con PayPal Sandbox para garantizar
                            una experiencia de compra completamente segura y
                            confiable para todos los estudiantes.
                        </p>

                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                            <FaBolt
                                size={28}
                                className="text-blue-900"
                            />
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Acceso Inmediato
                        </h3>

                        <p className="text-gray-600 leading-7">
                            Una vez confirmado el pago, el estudiante queda
                            matriculado automáticamente en la plataforma,
                            pudiendo iniciar su aprendizaje sin demoras.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}
