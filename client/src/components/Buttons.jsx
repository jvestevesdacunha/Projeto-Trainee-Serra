export default function Buttons({ text, style = "none", Icon = null, className = "", ...props }) {

    const styles = {
        primary: "w-full p-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 cursor-pointer shadow-sm flex items-center justify-center gap-2",
        secondary: "w-full p-3 rounded-xl font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2",
        none: ""
    }

    const presetClass = styles[style] || styles.none
    const combinedClasses = `${presetClass} ${className}`.trim()

    return (
        <button className={combinedClasses} {...props}>
            {Icon && <Icon className="w-5 h-5" />}
            {text && <span>{text}</span>}
        </button>
    )
}