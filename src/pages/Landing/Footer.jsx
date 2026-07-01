// pages/Landing/Footer.jsx

import { Link } from "react-router-dom";
import { FaPaypal, FaLock, FaCircleCheck } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-14">

            <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-4">

                {/* Logo */}
                <div className="md:col-span-2">

                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <img
                            src="https://lh3.googleusercontent.com/aida/AP1WRLt5pZL-kkyZHiQDXeN5Zp1ktiH6Kne7vGIfUYDibsjBGpkJjsCHQn9nZToN5BDwwdom96GiVVXS7Gv_bLqoWwhpThN3pDsuTDVHVcoqdbT9GFk3tJiq-MaXHtq1yk84KJYHpXZUVGDY5C3HdRmGzZ6aXFmWwTeHvTkGPuQBkg_s0LvLqlh9iA3g8jdQRJynKRQwPqEqk8rKqqZcVB_bf0o8DhygR0MgkwK8DFosXyZvVLLoHsj8AGRQA9Zv"
                            alt="EduPay Academy Logo"
                            className="w-10 h-10 rounded object-cover"
                        />

                        <span className="text-2xl font-bold text-blue-900">
                            EduPay Academy
                        </span>
                    </Link>

                    <p className="mt-6 text-gray-600 leading-7">
                        © UCR 2026 <br />

                        Proyecto Final de Lenguajes IF4101
                    </p>

                    <div className="mt-4 space-y-1 text-gray-600">

                        <p>Roger Alejandro Salazar Castro - B15980</p>

                        <p>Jefferson Fuentes Quirós - C4F249</p>

                        <p>Hillary Masis Morales - C14534</p>

                    </div>

                </div>

                {/* Navegación */}
                <div>

                    <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-5">
                        Plataforma
                    </h4>

                    <ul className="space-y-3">

                        <li>
                            <Link
                                to="/"
                                className="text-gray-600 hover:text-amber-600 transition-colors"
                            >
                                Inicio
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/login"
                                className="text-gray-600 hover:text-amber-600 transition-colors"
                            >
                                Iniciar Sesión
                            </Link>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="text-gray-600 hover:text-amber-600 transition-colors"
                            >
                                Contacto
                            </a>
                        </li>

                    </ul>

                </div>

                {/* Pagos */}
                <div>

                    <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-5">
                        Pagos Seguros
                    </h4>

                    <div className="flex flex-col gap-3">

                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">

                            <FaPaypal
                                className="text-blue-700"
                                size={18}
                            />

                            <span className="text-gray-700 font-medium">
                                PayPal
                            </span>

                            <FaCircleCheck
                                className="ml-auto text-green-600"
                                size={16}
                            />

                        </div>

                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">

                            <FaLock
                                className="text-green-600"
                                size={18}
                            />

                            <span className="text-gray-700 font-medium">
                                SSL Seguro
                            </span>

                            <FaCircleCheck
                                className="ml-auto text-green-600"
                                size={16}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
}
