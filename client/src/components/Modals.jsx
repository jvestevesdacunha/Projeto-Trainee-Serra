import Buttons from "./Buttons"
import { X } from "lucide-react"

export default function Modals({ isOpen, onClose, title, description, children }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-zinc-100 relative flex flex-col">
                
                <div className="absolute top-4 right-4">
                    <Buttons 
                        style="none" 
                        Icon={X} 
                        className="p-1 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors"
                        onClick={onClose} 
                    />
                </div>

                {(title || description) && (
                    <div className="mb-6 text-left">
                        {title && <h2 className="text-xl font-bold text-zinc-950">{title}</h2>}
                        {description && <p className="text-sm text-zinc-500">{description}</p>}
                    </div>
                )}

                {children}
            </div>
        </div>
    )
}