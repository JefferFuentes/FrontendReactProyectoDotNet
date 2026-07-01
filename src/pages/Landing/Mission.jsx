// pages/Landing/Mission.jsx

import { Link } from "react-router-dom";
import {
    FaEye,
    FaRocket,
    FaGraduationCap,
} from "react-icons/fa6";

export default function Mission() {
    return (
        <section className="py-20">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid md:grid-cols-12 gap-6 md:h-[600px]">

                    {/* =======================
                        VISIÓN
                    ======================= */}

                    <div className="md:col-span-7 relative rounded-3xl overflow-hidden group">

                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGACxZhxXbMTucS9OBVAocOdXkGdQMGDWNAIND_I4QpA1DHYYmRnTeBQnRQDGi3UroOJ1hmglietJjlGK1SixultPTGsqoY_uXa5zxQkI__zzRQu7O7pRbXosJ6txe0wKpMaXvpuLxPmTzNlUmE1EvgIg_fpEEH-aGb1s_mGQNUxWi8ijn7ipGO_rDuXdYGukg0r4FPnSEErL8pjQ5_gz5MjhwdfdSBEKmQrnKzN_zH2ZVXn4qdd1KPD7EShsT7DtcRqGxJ1HsH_Aw"
                            alt="Nuestra visión"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/60 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-10">

                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white rounded-full px-4 py-2 border border-white/20">

                                <FaEye />

                                <span>Perspectiva</span>

                            </div>

                            <h2 className="mt-6 text-4xl font-bold text-white">

                                Nuestra Visión

                            </h2>

                            <p className="mt-5 text-lg text-white/90 leading-8 max-w-lg">

                                Ser una plataforma educativa reconocida por
                                ofrecer una experiencia sencilla, segura y
                                accesible para que cualquier persona pueda
                                desarrollar nuevas habilidades mediante cursos
                                de calidad.

                            </p>

                        </div>

                    </div>

                    {/* =======================
                        DERECHA
                    ======================= */}

                    <div className="md:col-span-5 flex flex-col gap-6">

                        {/* MISIÓN */}

                        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-3xl shadow-sm p-8 hover:-translate-y-1 hover:shadow-lg transition">

                            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-900">

                                <FaRocket size={24} />

                            </div>

                            <h2 className="mt-6 text-3xl font-bold text-gray-900">

                                Nuestra Misión

                            </h2>

                            <p className="mt-4 text-gray-600 leading-8">

                                Facilitar el acceso a la educación digital
                                mediante una plataforma intuitiva que permita
                                descubrir cursos, realizar pagos seguros y
                                gestionar las matrículas de forma eficiente.

                            </p>

                        </div>

                        {/* CTA */}

                        <div className="relative flex-1 bg-blue-900 rounded-3xl overflow-hidden p-8 text-white">

                            <FaGraduationCap
                                size={170}
                                className="absolute right-0 top-0 opacity-10 translate-x-6 -translate-y-6"
                            />

                            <div className="relative z-10">

                                <h3 className="text-3xl font-bold">

                                    ¿Listo para empezar?

                                </h3>

                                <p className="mt-4 text-blue-100 leading-8">

                                    Únete a miles de estudiantes y comienza
                                    tu viaje de aprendizaje hoy mismo.

                                </p>

                                <Link to="/login">

                                    <button className="mt-8 bg-amber-600 hover:bg-amber-700 transition px-6 py-3 rounded-lg font-semibold shadow-lg">

                                        Iniciar Sesión

                                    </button>

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}
