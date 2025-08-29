"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Logo from "../atoms/Logo"

const Navbar = () => {
    return (
        <>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2, delay: 4, ease: "easeInOut" }}
                className="flex fixed z-50 top-6 w-full items-center justify-center"
            >
                <div className="w-fit bg-white backdrop-blur-2xl p-2 rounded-full">
                    <div className="w-fit inline-flex space-x-2 items-center">
                        <div className="flex w-fit border-r border-neutral-400">
                            <Logo
                                link
                                aurora
                                className={"text-black !text-lg px-3"}
                            />
                        </div>
                        {
                            NavItems.map((item, i) => (
                                <div key={i} className="w-fit">
                                    <Link
                                        href={item.href}
                                        className="flex text-sm text-neutral-800 font-semibold py-1.5 px-3 md:px-4 hover:bg-purple-500 hover:text-white rounded-full transition-all ease-in-out"
                                    >
                                        {item.name}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Navbar


const NavItems = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Agents",
        href: "/agents",
    },
    {
        name: "Blog",
        href: "/blogs",
    },
]
