import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { path: "/", label: "首页", en: "Home" },
  { path: "/xiaozhuan", label: "小篆", en: "Xiaozhuan" },
  { path: "/dazhuan", label: "大篆", en: "Dazhuan" },
  { path: "/niaochongzhuan", label: "鸟虫篆", en: "Niaochong" },
  { path: "/qianziwen", label: "千字文", en: "Qianziwen" },
  { path: "/sanzijing", label: "三字经", en: "Sanzijing" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-paper/85 border-b border-bronze/20">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 seal-stamp flex items-center justify-center text-paper font-display text-lg group-hover:rotate-0 transition-transform">
              篆
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-lg text-ink leading-none">篆书之美</div>
              <div className="text-[10px] text-rubbing tracking-widest mt-0.5">
                SEAL SCRIPT GALLERY
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 font-serif text-sm transition-colors ${
                    isActive
                      ? "text-cinnabar"
                      : "text-ink/70 hover:text-ink"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute inset-0 bg-cinnabar/10 rounded"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="菜单"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`h-0.5 bg-ink transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 bg-ink transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-ink transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden overflow-hidden border-t border-bronze/20"
          >
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 font-serif text-sm border-b border-bronze/10 ${
                    isActive ? "text-cinnabar bg-cinnabar/5" : "text-ink/70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </nav>
    </header>
  );
}
