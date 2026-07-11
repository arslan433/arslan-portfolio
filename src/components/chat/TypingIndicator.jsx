export default function TypingIndicator() {
    return (
        <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-2xl rounded-bl-none border border-zinc-200/50 dark:border-zinc-800/50 flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
        </div>
    );
}