import { motion } from "framer-motion";
import { ArrowRight, Globe, HeartPulse, BookOpen, GraduationCap, Link2, Users } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

function HeroPublic() {
    const { setShowGatekeeper } = useAuth();

    return (
        <section id="sobre-nosotros" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex items-center justify-center overflow-hidden min-h-screen">
            {/* Video Background */}
            <div className="absolute inset-0 z-0 bg-white">
                <div className="absolute inset-0 bg-white/80 z-10 backdrop-blur-sm" />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="container relative z-10 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-primary font-bold text-sm mb-6 border border-primary/20"
                    >
                        <HeartPulse className="w-4 h-4" />
                        Fundación Red Cultura Diversa | Bogotá, Colombia
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-8 text-foreground"
                    >
                        Transformando realidades con <span className="text-primary">Educación y Cultura</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium leading-relaxed max-w-3xl mx-auto"
                    >
                        Somos una organización sin ánimo de lucro dedicada a combatir la desigualdad. Apoyamos a niños, jóvenes y familias de comunidades vulnerables mediante acompañamiento social, formación vocacional y empatía.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        <span className="px-4 py-1.5 rounded-full bg-secondary text-primary font-bold text-sm">#Inclusión</span>
                        <span className="px-4 py-1.5 rounded-full bg-secondary text-primary font-bold text-sm">#Empatía</span>
                        <span className="px-4 py-1.5 rounded-full bg-secondary text-primary font-bold text-sm">#Solidaridad</span>
                        <span className="px-4 py-1.5 rounded-full bg-secondary text-primary font-bold text-sm">#Cultura</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-center items-center gap-4"
                    >
                        <a href="#unete">
                            <button
                                className="px-8 py-4 w-full sm:w-auto text-lg font-bold bg-primary text-white hover:bg-primary/90 transition-all rounded-full shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group"
                            >
                                Sé parte del cambio
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </a>
                        <a href="https://www.instagram.com/redculturadiversa/" target="_blank" rel="noreferrer">
                            <button className="px-8 py-4 w-full sm:w-auto text-lg font-bold border-2 border-border text-foreground hover:border-primary hover:text-primary transition-all rounded-full bg-white flex items-center justify-center gap-2">
                                Nuestras Redes
                            </button>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function QueHacemos() {
    const features = [
        {
            icon: <GraduationCap className="w-8 h-8 text-primary" />,
            title: "Programas Sociales",
            desc: "Desarrollamos proyectos que atienden directamente las necesidades de comunidades vulnerables, promoviendo la igualdad de oportunidades."
        },
        {
            icon: <BookOpen className="w-8 h-8 text-primary" />,
            title: "Educación y Vocación",
            desc: "Brindamos aprendizaje vocacional y herramientas académicas a jóvenes para forjarles un futuro profesional sostenible."
        },
        {
            icon: <HeartPulse className="w-8 h-8 text-primary" />,
            title: "Apoyo Psicosocial",
            desc: "Contamos con profesionales y voluntarios capacitados para ofrecer contención emocional y bienestar mental a familias."
        }
    ];

    return (
        <section id="que-hacemos" className="py-24 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold mb-2 uppercase tracking-widest text-sm">Nuestro Trabajo</h2>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-foreground">¿Qué Hacemos?</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-8 bg-white rounded-3xl border border-border/50 shadow-xl shadow-border/20 text-center hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 font-display text-foreground">{feature.title}</h3>
                            <p className="text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ImpactoComunidad() {
    return (
        <section id="impacto" className="py-24 bg-background relative overflow-hidden">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]" />

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold mb-2 uppercase tracking-widest text-sm">Logros Y Vivencias</h2>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-foreground">Impacto y Comunidad</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-white p-8 rounded-3xl border border-border/50 shadow-xl relative">
                            <div className="absolute -top-6 -left-6 text-6xl text-primary/20 font-serif">"</div>
                            <p className="text-lg text-foreground font-medium mb-6 italic leading-relaxed">
                                "Ser voluntaria en Recreación y Pintura me permitió conectar con niños que realmente lo necesitan. Ver cómo un espacio de arte puede transformar su tarde y darles esperanza es una experiencia invaluable."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">V</div>
                                <div>
                                    <h4 className="font-bold text-foreground">Valeria Gómez</h4>
                                    <p className="text-sm text-muted-foreground">Voluntaria Capacitada</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h4 className="text-2xl font-bold text-foreground font-display">Sembrando Esperanza</h4>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Nuestras actividades culturales y nuestro programa de voluntariado han logrado impactar directamente a familias en situación de vulnerabilidad en Bogotá. Generamos espacios seguros donde el progreso colectivo es la meta principal.
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border/50">
                            <div>
                                <div className="text-4xl font-display font-bold text-primary mb-2">+500</div>
                                <div className="text-sm font-bold text-muted-foreground uppercase">Jóvenes Impactados</div>
                            </div>
                            <div>
                                <div className="text-4xl font-display font-bold text-primary mb-2">100%</div>
                                <div className="text-sm font-bold text-muted-foreground uppercase">Compromiso Social</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function ContactoUnete() {
    return (
        <section id="unete" className="py-24 bg-primary text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Únete a nuestra causa</h2>
                <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
                    Tu tiempo y tus recursos pueden cambiar la vida de alguien. Transforma vidas con nosotros y sé parte del cambio en Bogotá.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                        <h3 className="font-bold text-xl mb-3 flex items-center gap-2"><Users className="w-5 h-5" /> Voluntariado</h3>
                        <p className="text-white/80 text-sm">Capacítate y dona tu tiempo en apoyo psicosocial, recreación y arte vocacional.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                        <h3 className="font-bold text-xl mb-3 flex items-center gap-2"><HeartPulse className="w-5 h-5" /> Donaciones</h3>
                        <p className="text-white/80 text-sm">Apoya nuestros programas brindando recursos directos para mantener nuestras actividades operando.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                        <h3 className="font-bold text-xl mb-3 flex items-center gap-2"><Link2 className="w-5 h-5" /> Difusión</h3>
                        <p className="text-white/80 text-sm">Síguenos en nuestras redes sociales, comparte nuestra misión y expande nuestro impacto.</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a href="https://wa.me/573144428408" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                        <button className="w-full px-8 py-4 text-lg font-bold bg-white text-primary hover:bg-white/90 transition-all rounded-full shadow-xl flex items-center justify-center gap-2">
                            Contactar al 3144428408
                        </button>
                    </a>
                    <span className="text-white/60 font-medium text-sm">Sede: Calle 7 #87B-53, Bogotá</span>
                </div>
            </div>
        </section>
    )
}

export default function PublicLanding() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
            <Navigation />
            <main>
                <HeroPublic />
                <QueHacemos />
                <ImpactoComunidad />
                <ContactoUnete />
            </main>
            <Footer />
        </div>
    );
}
