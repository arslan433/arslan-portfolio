import Navbar, { DropMenu } from "./Navbar";
export default function Header() {
    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 flex justify-between items-center px-6 py-3 rounded-full backdrop-blur-[12px] bg-white/40 dark:bg-black/40 border border-emerald-500/10 dark:border-emerald-500/10 shadow-[0_8px_32px_0_rgba(16,185,129,0.12)] dark:shadow-[0_8px_32px_0_rgba(16,185,129,0.25)] transition-all duration-300">
            <div className="flex items-center gap-2 font-medium">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-90 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-xs tracking-wider uppercase text-emerald-600 dark:text-emerald-400">Available for Work</span>
            </div>

            <Navbar />

            <div className="flex items-center gap-3">
                <div id="/#contact" className="hidden md:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg dark:bg-emerald-500 dark:hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all duration-200">
                    Let's Talk...
                </div>
                <DropMenu />
            </div>
        </header>
    )
}