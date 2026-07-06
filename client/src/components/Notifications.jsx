import { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

export default function Notifications({ message, type = "sucess", onClose, duration = 3000 }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [onClose])

    const styles = {
        success: {
            bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
            icon: CheckCircle,
            iconColor: "text-emerald-500",
        },
        error: {
            bg: "bg-rose-50 border-rose-200 text-rose-800",
            icon: XCircle,
            iconColor: "text-rose-500",
        },
        info: {
            bg: "bg-blue-50 border-blue-200 text-blue-800",
            icon: AlertCircle,
            iconColor: "text-blue-500",
        }
    }

    const currentStyle = styles[type] || styles.success
    const Icon = currentStyle.icon

    return (
        <div className="fixed top-4 right-4 z-60 animate-slide-in">
            <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg max-w-sm ${currentStyle.bg}`}>
                <Icon size={20} className={currentStyle.iconColor} />
                <p className="text-sm font-medium pr-4 leading-tight">{message}</p>
                <button
                    onClick={onClose}
                    className="ml-auto text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    )
}