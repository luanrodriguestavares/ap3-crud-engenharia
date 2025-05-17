import { useQuery, useMutation, useQueryClient } from "react-query"
import { Link } from "react-router-dom"
import axios from "axios"
import { PencilIcon, TrashIcon, UserCircleIcon, PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

function UserList() {
    const queryClient = useQueryClient()
    const [searchTerm, setSearchTerm] = useState("")

    const {
        data: users,
        isLoading,
        error,
    } = useQuery("users", async () => {
        const response = await axios.get("/api/users")
        return response.data
    })

    const deleteMutation = useMutation(
        async (id) => {
            await axios.delete(`/api/users/${id}`)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("users")
            },
        },
    )

    const filteredUsers = users?.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-500 font-medium">Carregando usuários...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Erro ao carregar usuários</h3>
                        <div className="mt-2 text-sm text-red-700">
                            <p>{error.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-90"></div>
                    <div className="relative px-6 py-10 sm:px-10">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-6 md:mb-0">
                                <h2 className="text-3xl font-bold text-white">Lista de Usuários</h2>
                                <p className="mt-2 text-blue-100 max-w-2xl">
                                    Gerencie todos os usuários do sistema em um só lugar. Adicione, edite ou remova usuários conforme
                                    necessário.
                                </p>
                            </div>
                            <Link
                                to="/users/new"
                                className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg shadow-md hover:bg-blue-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Adicionar Usuário
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Buscar usuários por nome ou email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {filteredUsers?.length === 0 ? (
                <div className="bg-white border border-gray-300 rounded-xl shadow-md p-8 text-center">
                    <div className="mx-auto h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserCircleIcon className="h-12 w-12 text-blue-600" />
                    </div>
                    <h3 className="mt-6 text-xl font-medium text-gray-900">Nenhum usuário encontrado</h3>
                    <p className="mt-2 text-gray-500 max-w-md mx-auto">
                        {searchTerm
                            ? "Nenhum usuário corresponde à sua busca. Tente outros termos."
                            : "Comece adicionando um novo usuário ao sistema."}
                    </p>
                    {!searchTerm && (
                        <div className="mt-6">
                            <Link
                                to="/users/new"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Adicionar Usuário
                            </Link>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredUsers?.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-300 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{user.name}</h3>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {user.age} anos
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{user.email}</p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <Link
                                                to={`/users/${user.id}/edit`}
                                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                            >
                                                <PencilIcon className="h-4 w-4 mr-1.5 text-gray-500" />
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
                                                        deleteMutation.mutate(user.id)
                                                    }
                                                }}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                            >
                                                <TrashIcon className="h-4 w-4 mr-1.5" />
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserList
