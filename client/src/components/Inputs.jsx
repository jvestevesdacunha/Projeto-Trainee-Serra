import * as Lucide from "lucide-react"

export default function Inputs({ icon: Icon, ...props }) {
  return (
    <div className="relative w-full text-zinc-400 focus-within:text-blue-600 transition-colors">
      {Icon && (
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Icon size={20} strokeWidth={2} />
        </div>
      )}

      <input
        className={`w-full p-4 border rounded-3xl border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 outline-none focus:border-blue-600 focus:bg-white transition-all duration-200 ${Icon ? "pl-12" : "pl-4"
          }`}
        {...props}
      />
    </div>
  )
}