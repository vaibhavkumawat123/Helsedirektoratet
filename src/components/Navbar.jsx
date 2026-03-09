import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-16 py-6 bg-transparent"
    >
      {/* LOGO */}

      <h1 className="text-[#0b5c6b] text-xl font-semibold tracking-wide">
        Helsedirektoratet
      </h1>

      {/* MENU */}

      <div className="flex gap-10 text-[#0b5c6b] text-[15px] font-medium">
        <a className="hover:opacity-70 cursor-pointer">Products</a>
        <a className="hover:opacity-70 cursor-pointer">About</a>
        <a className="hover:opacity-70 cursor-pointer">Research</a>
        <a className="hover:opacity-70 cursor-pointer">Contact</a>
      </div>
    </motion.nav>
  );
}