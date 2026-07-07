import { useState } from "react"
import Buttons from "../components/Buttons"
import Header from "../components/Header"
import Inputs from "../components/Inputs"
import Notifications from "../components/Notifications"
import { useAuthFormsStates, useAuthModalsStates, useNotificationStates } from "../utils/states"
import { api } from "../service/api"
import { TokenManager } from "../service/tokenManager"
import { User, Mail, KeyRound, X } from "lucide-react"
import Modals from "../components/Modals"

export default function AuthenticationPage() {

    const tokenManager = new TokenManager()

    const { registerModal, setRegisterModal, loginModal, setLoginModal } = useAuthModalsStates()
    const { name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword } = useAuthFormsStates()
    const { notification, setNotification } = useNotificationStates()

    async function cleanForm() {
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    async function handleRegisterSubmit(e) {
        e.preventDefault()

        if (!name || !email || !password || !confirmPassword) return setNotification({
            message: "Todos os campos são obrigatórios!",
            type: "error"
        })

        if (password !== confirmPassword) return setNotification({
            message: "As senhas não coincidem!",
            type: "error"
        })

        try {
            const response = await api.post("/register", {
                name,
                email,
                password
            })

            setNotification({
                message: "Conta criada com sucesso!",
            })
            setRegisterModal(false)
            cleanForm()
        } catch (error) {
            setNotification({
                message: error.response?.data?.message || "Erro ao conectar com o servidor",
                type: "error"
            })
        }
    }

    async function handleLoginSubmit(e) {
        e.preventDefault()

        if (!email || !password) return setNotification({
            message: "Todos os campos são obrigatórios!",
            type: "error"
        })

        try {
            const response = await api.post("/login", {
                email,
                password
            })

            const { token } = response.data
            await tokenManager.save(token)
            setNotification({
                message: "Login realizado com sucesso!",
            })
            setLoginModal(false)
            cleanForm()
        } catch (error) {
            setNotification({
                message: error.response?.data?.message || "Erro ao conectar com o servidor",
                type: "error"
            })
        }
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">

                {notification && (
                    <Notifications
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}

                <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 text-center flex flex-col gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">Evolua seu Treino</h1>
                        <p className="text-zinc-500 text-sm mt-1">Gerencie seus treinos e acompanhe sua evolução.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Buttons text="Registrar" style="primary" onClick={() => setRegisterModal(true)} />
                        <Buttons text="Entrar na Conta" style="secondary" onClick={() => setLoginModal(true)} />
                    </div>
                </div>

                {registerModal && (
                    <Modals
                        isOpen={registerModal}
                        onClose={() => { setRegisterModal(false), cleanForm() }}
                        title="Comece agora"
                        description="Crie sua conta para acessar a plataforma."
                    >

                        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">

                            <Inputs placeholder="Nome completo" icon={User} value={name} onChange={(e) => setName(e.target.value)} />
                            <Inputs placeholder="E-mail" type="text" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Inputs placeholder="Senha" type="password" icon={KeyRound} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Inputs placeholder="Confirmar Senha" type="password" icon={KeyRound} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                            <Buttons text="Registrar" style="primary" type="submit" />

                        </form>
                    </Modals>
                )}

                {loginModal && (
                    <Modals
                        isOpen={loginModal}
                        onClose={() => { setLoginModal(false), cleanForm() }}
                        title="Boas-vindas de volta"
                        description="Insira suas credenciais para acessar o sistema."
                    >

                        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                            <Inputs placeholder="E-mail" type="text" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Inputs placeholder="Senha" type="password" icon={KeyRound} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className="text-right">
                                <a href="#" className="text-xs text-blue-600 hover:underline">Esqueceu a senha?</a>
                            </div>
                            <Buttons text="Entrar" style="primary" type="submit" />
                        </form>
                    </Modals>
                )}
            </div>
        </>
    )
}