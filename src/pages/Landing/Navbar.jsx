import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <img
                        src="https://lh3.googleusercontent.com/aida/AP1WRLt5pZL-kkyZHiQDXeN5Zp1ktiH6Kne7vGIfUYDibsjBGpkJjsCHQn9nZToN5BDwwdom96GiVVXS7Gv_bLqoWwhpThN3pDsuTDVHVcoqdbT9GFk3tJiq-MaXHtq1yk84KJYHpXZUVGDY5C3HdRmGzZ6aXFmWwTeHvTkGPuQBkg_s0LvLqlh9iA3g8jdQRJynKRQwPqEqk8rKqqZcVB_bf0o8DhygR0MgkwK8DFosXyZvVLLoHsj8AGRQA9Zv"
                        alt="EduPay Academy Logo"
                        className="w-9 h-9 rounded object-cover"
                    />

                    <span className="text-2xl font-bold text-blue-900">
                        EduPay Academy
                    </span>
                </Link>

                {/* Menú */}
                <div className="hidden md:flex items-center gap-8">

                    <a
                        href="#"
                        className="font-semibold text-blue-900 border-b-2 border-blue-900 pb-1"
                    >
                        Cursos
                    </a>

                    <a
                        href="#"
                        className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                        Precios
                    </a>

                    <a
                        href="#"
                        className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                        Misión
                    </a>

                    <a
                        href="#"
                        className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                        Sobre Nosotros
                    </a>

                </div>

                {/* Botones */}
                <div className="hidden md:flex items-center gap-4">

                    <button
                        className="px-5 py-2 rounded-lg border border-amber-600 text-amber-600 hover:bg-amber-50 transition-colors"
                    >
                        Ver Cursos
                    </button>

                    <Link to="/login">
                        <button
                            className="px-5 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 shadow transition-colors"
                        >
                            Iniciar Sesión
                        </button>
                    </Link>

                </div>

                {/* Menú móvil */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Abrir menú"
                >
                    <HiBars3
                        size={28}
                        className="text-gray-700"
                    />
                </button>

            </div>
        </nav>
    );
}
