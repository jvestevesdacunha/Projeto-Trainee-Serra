import { useState } from "react"

export function useAuthModalsStates() {
    const [registerModal, setRegisterModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)

    return {
        registerModal, setRegisterModal, loginModal, setLoginModal
    }
}

export function useAuthFormsStates() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    return {
        name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword
    }
}

export function useNotificationStates() {
    const [notification, setNotification] = useState(null)

    return {
        notification, setNotification
    }
}