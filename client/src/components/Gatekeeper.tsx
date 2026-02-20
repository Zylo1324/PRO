import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Gatekeeper() {
    const { showGatekeeper, setShowGatekeeper, login } = useAuth();
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!login(password)) {
            setError(true);
            setTimeout(() => setError(false), 3000);
        } else {
            setPassword("");
        }
    };

    return (
        <AnimatePresence>
            {showGatekeeper && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        onClick={() => setShowGatekeeper(false)}
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/50 p-8 shadow-2xl rounded-3xl"
                    >
                        <button
                            onClick={() => setShowGatekeeper(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors bg-white/50 rounded-full p-2"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-8 pt-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                <Lock className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Acceso Privado</h2>
                            <p className="text-muted-foreground font-medium">Ingresa tu código de estudiante</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                    className={`w-full bg-white border ${error ? "border-destructive text-destructive" : "border-border focus:border-primary"
                                        } rounded-2xl px-6 py-4 outline-none transition-all text-center text-xl tracking-wider`}
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-destructive text-sm text-center font-medium bg-destructive/10 py-2 rounded-xl"
                                >
                                    Clave incorrecta, verifica con la administración
                                </motion.p>
                            )}

                            <button
                                type="submit"
                                className="w-full py-4 text-lg font-bold bg-primary text-white hover:bg-primary/90 transition-all rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group"
                            >
                                Ingresar al Campus
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
