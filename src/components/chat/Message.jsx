import ReactMarkdown from "react-markdown";

export default function Message({ message }) {
    const isUser = message.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm
                ${
                    isUser
                        ? "bg-gradient-to-tr from-emerald-500 to-emerald-600 text-white text-xs rounded-br-none"
                        : "bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-800 dark:text-zinc-100 rounded-bl-none border border-zinc-200/50 dark:border-zinc-800/50"
                }`}
            >
                <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
        </div>
    );
}