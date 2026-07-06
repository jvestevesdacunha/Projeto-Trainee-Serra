import {Dumbbell} from "lucide-react"

export default function Header() {
    return (
        <header className="w-full bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xl tracking-tight">
                <Dumbbell size={24} />
            </div>
        </header>
    )
}