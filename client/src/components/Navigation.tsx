import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, LogOut, CircleUserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Gatekeeper } from "./Gatekeeper";

const publicLinks = [
  { href: "/", label: "Sobre Nosotros" },
  { href: "/#que-hacemos", label: "Qué Hacemos" },
  { href: "/#impacto", label: "Impacto y Comunidad" },
];

const privateLinks = [
  { href: "/campus", label: "Mis Cursos" },
  { href: "/campus#comunidad", label: "Comunidad" },
  { href: "/campus#tareas", label: "Tareas" },
  { href: "/campus#calificaciones", label: "Calificaciones" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, logout, setShowGatekeeper } = useAuth();

  const links = isAuthenticated ? privateLinks : publicLinks;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-border py-4 shadow-sm"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href={isAuthenticated ? "/campus" : "/"}>
            <div className="font-display font-bold text-2xl tracking-tighter cursor-pointer select-none text-foreground flex items-center gap-2">
              <span className="bg-primary text-white p-1 rounded-lg">Campus</span> Virtual<span className="text-primary">.</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  location === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}

            <div className="flex items-center gap-4 ml-4">
              {!isAuthenticated ? (
                <>
                  <button className="px-5 py-2 text-sm font-bold border-2 border-primary text-primary hover:bg-primary/10 transition-all rounded-full">
                    Ingreso Profesor
                  </button>
                  <button
                    onClick={() => setShowGatekeeper(true)}
                    className="px-5 py-2 text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-all rounded-full shadow-lg shadow-primary/30"
                  >
                    Ingreso Alumno
                  </button>
                </>
              ) : (
                <>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-foreground hover:bg-muted transition-all rounded-full">
                    <CircleUserRound className="w-5 h-5 text-primary" /> Estudiante
                  </button>
                  <button
                    onClick={logout}
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all rounded-full"
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-white pt-28 px-4 md:hidden"
          >
            <nav className="flex flex-col gap-6 items-center">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-display font-bold hover:text-primary transition-colors text-foreground"
                >
                  {link.label}
                </a>
              ))}

              <div className="flex flex-col gap-4 w-full mt-8">
                {!isAuthenticated ? (
                  <>
                    <button className="w-full py-4 text-lg font-bold border-2 border-primary text-primary hover:bg-primary/10 transition-all rounded-full">
                      Ingreso Profesor
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setShowGatekeeper(true);
                      }}
                      className="w-full py-4 text-lg font-bold bg-primary text-white hover:bg-primary/90 transition-all rounded-full shadow-lg shadow-primary/30"
                    >
                      Ingreso Alumno
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full py-4 text-lg font-bold bg-destructive/10 text-destructive border-2 border-destructive hover:bg-destructive hover:text-white transition-all rounded-full shadow-lg flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" /> Cerrar Sesión
                  </button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <Gatekeeper />
    </>
  );
}
