
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="hidden md:flex items-center gap-1">
            <Link href="/" id="link" className="px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full transition-all duration-200">Overview</Link>
            <Link href="/#about" id="link" className="px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full transition-all duration-200">About</Link>
            <Link href="/projects" id="link" className="px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full transition-all duration-200">Projects</Link>
            <Link href="/#about" id="link" className="px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full transition-all duration-200">Experience</Link>
            <Link href="/#tech-stack" id="link" className="px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full transition-all duration-200">Tech Stack</Link>
            <Link href="/#contact" id="link" className="px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full transition-all duration-200">Contact</Link>
        </nav>
    )
}
import { Menu, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropMenu() {
    return (
        <div className="md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
                        <Menu size={20} className="text-zinc-700 dark:text-zinc-300" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-[12px] border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-2 shadow-xl" align="end">
                    <Link href="/">
                        <DropdownMenuItem className="rounded-xl px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 focus:bg-zinc-100 dark:focus:bg-zinc-900 cursor-pointer">
                            Overview
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuGroup>
                        <Link href="/#about">
                            <DropdownMenuItem className="rounded-xl px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 focus:bg-zinc-100 dark:focus:bg-zinc-900 cursor-pointer">
                                About
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/#tech-stack">
                            <DropdownMenuItem className="rounded-xl px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 focus:bg-zinc-100 dark:focus:bg-zinc-900 cursor-pointer">
                                Skills
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/projects">
                            <DropdownMenuItem className="rounded-xl px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 focus:bg-zinc-100 dark:focus:bg-zinc-900 cursor-pointer">
                                Projects
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/#contact">
                            <DropdownMenuItem className="rounded-xl px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 focus:bg-zinc-100 dark:focus:bg-zinc-900 cursor-pointer">
                                Contact
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-zinc-200/50 dark:bg-zinc-800/50 my-1" />
                    <Link target="_blank" href="https://github.com/arslan433/">
                        <DropdownMenuItem className="rounded-xl px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 focus:bg-zinc-100 dark:focus:bg-zinc-900 cursor-pointer flex justify-between items-center">
                            <span>GitHub</span>
                            <ExternalLink size={14} className="text-zinc-400" />
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}


