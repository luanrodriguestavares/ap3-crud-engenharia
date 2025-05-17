import { Link, useLocation } from "react-router-dom"
import { UserGroupIcon, UserPlusIcon, ListBulletIcon } from "@heroicons/react/24/outline"

function Navbar() {
    const location = useLocation()

    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-blue-700 text-xl font-bold transition-all duration-300"
                    >
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <UserGroupIcon className="h-6 w-6" />
                        </div>
                        <span>Sistema de Usuários</span>
                    </Link>

                    <div className="hidden md:flex bg-gray-100 rounded-full p-1">
                        <Link
                            to="/"
                            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${location.pathname === "/" ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <ListBulletIcon className="h-4 w-4 mr-2" />
                            Lista de Usuários
                        </Link>
                        <Link
                            to="/users/new"
                            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${location.pathname === "/users/new"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <UserPlusIcon className="h-4 w-4 mr-2" />
                            Novo Usuário
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <Link
                            to="/users/new"
                            className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-all"
                        >
                            <UserPlusIcon className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
