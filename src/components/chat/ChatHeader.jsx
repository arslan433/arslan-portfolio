import { MessageSquare, X, Send, Bot, User, CornerDownLeft } from "lucide-react";

export default function ChatHeader({ onClose }) {
    return (
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-emerald-400">
                    <Bot className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-sm font-bold leading-tight">AI Assistant</h4>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Online • Powered by Gemini
                    </span>
                </div>
            </div>
            <button
                onClick={() => onClose(false)}
                className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
                id="close-chatbot"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
}
