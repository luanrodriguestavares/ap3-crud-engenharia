import { useForm } from "react-hook-form"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { UserCircleIcon, ExclamationCircleIcon, ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

function UserForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const isEditing = Boolean(id)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const { data: user, isLoading } = useQuery(
        ["user", id],
        async () => {
            const response = await axios.get(`/api/users/${id}`)
            return response.data
        },
        {
            enabled: isEditing,
            onSuccess: (data) => {
                reset(data)
            },
        },
    )

    const mutation = useMutation(
        async (formData) => {
            setIsSubmitting(true)
            try {
                if (isEditing) {
                    const response = await axios.put(`/api/users/${id}`, formData)
                    return response.data
                } else {
                    const response = await axios.post("/api/users", formData)
                    return response.data
                }
            } catch (error) {
                if (error.response?.data?.errors) {
                    const errorMessage = error.response.data.errors.map(err => err.message).join('\n')
                    alert(errorMessage)
                } else if (error.response?.data?.message) {
                    alert(error.response.data.message)
                } else {
                    alert('Ocorreu um erro ao salvar o usuário')
                }
                throw error
            } finally {
                setIsSubmitting(false)
            }
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("users")
                navigate("/")
            },
        },
    )

    const onSubmit = (data) => {
        mutation.mutate(data)
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-500 font-medium">Carregando dados do usuário...</p>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto">
            <button
                onClick={() => navigate("/")}
                className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Voltar para lista de usuários
            </button>

            <div className="bg-white border border-gray-300 shadow-xl rounded-xl overflow-hidden">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-90"></div>
                    <div className="relative px-6 py-10 sm:px-10">
                        <div className="flex items-center space-x-5">
                            <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center">
                                <UserCircleIcon className="h-12 w-12 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">{isEditing ? "Editar Usuário" : "Novo Usuário"}</h2>
                                <p className="mt-1 text-blue-100">
                                    {isEditing ? "Atualize as informações do usuário" : "Preencha os dados para criar um novo usuário"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Nome Completo
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name", { required: "Nome é obrigatório" })}
                                    className={`block w-full p-2.5 pr-10 focus:outline-none sm:text-sm rounded-lg ${errors.name
                                            ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        }`}
                                    placeholder="Digite o nome completo"
                                    aria-invalid={errors.name ? "true" : "false"}
                                />
                                {errors.name && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                    </div>
                                )}
                            </div>
                            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email", {
                                        required: "Email é obrigatório",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Email inválido",
                                        },
                                    })}
                                    className={`block w-full p-2.5 pr-10 focus:outline-none sm:text-sm rounded-lg ${errors.email
                                            ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        }`}
                                    placeholder="exemplo@email.com"
                                />
                                {errors.email && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                    </div>
                                )}
                            </div>
                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                                Idade
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="number"
                                    id="age"
                                    {...register("age", {
                                        required: "Idade é obrigatória",
                                        min: { value: 1, message: "Idade deve ser maior que 0" },
                                        max: { value: 120, message: "Idade não pode ser maior que 120 anos" },
                                        valueAsNumber: true,
                                    })}
                                    className={`block w-full p-2.5 pr-10 focus:outline-none sm:text-sm rounded-lg ${errors.age
                                            ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        }`}
                                    placeholder="Digite a idade"
                                />
                                {errors.age && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                    </div>
                                )}
                            </div>
                            {errors.age && <p className="mt-2 text-sm text-red-600">{errors.age.message}</p>}
                            <p className="mt-2 text-xs text-gray-500">A idade deve estar entre 1 e 120 anos.</p>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <CheckIcon className="h-5 w-5 mr-2" />
                            {isEditing ? "Atualizar" : "Criar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserForm
