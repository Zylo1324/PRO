import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Users, MessageSquare, PlayCircle, Clock, Award, CheckCircle2, CircleDashed, FileCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Hero Section
function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex items-center justify-center overflow-hidden min-h-[80vh]">
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

      <div className="container relative z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl max-auto"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm mb-6 border border-primary/20 backdrop-blur-md">
            Ciclo Académico 2026-I
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none tracking-tight mb-6 text-foreground">
            Bienvenido, <br />
            <span className="text-primary">
              Estudiante
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-medium">
            Tu progreso académico hoy
          </p>

          {/* General Progress Bar */}
          <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-3xl shadow-xl shadow-primary/5 max-w-2xl">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Progreso General</p>
                <p className="text-3xl font-display font-bold text-foreground">68%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground">4/6 Cursos On-track</p>
              </div>
            </div>
            <div className="w-full bg-secondary rounded-full h-4 overflow-hidden border border-border">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "68%" }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="bg-primary h-full rounded-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Mis Cursos Section
function MisCursos() {
  const cursos = [
    {
      id: 1,
      title: "Matemáticas Avanzadas",
      profesor: "Dr. Carlos Mendoza",
      progress: 75,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
      icon: <Award className="w-6 h-6 text-primary" />,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Ciencias Físicas II",
      profesor: "Dra. Ana Silva",
      progress: 45,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      color: "bg-indigo-500"
    },
    {
      id: 3,
      title: "Historia Universal",
      profesor: "Lic. Roberto Paz",
      progress: 90,
      image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800",
      icon: <Clock className="w-6 h-6 text-primary" />,
      color: "bg-sky-500"
    },
  ];

  return (
    <section id="cursos" className="py-24 bg-background relative">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-primary font-bold mb-2 uppercase tracking-widest text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Periodo Actual
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Mis Cursos
            </h3>
          </div>
          <button className="px-6 py-3 font-bold border border-border hover:border-primary hover:text-primary transition-colors rounded-full text-foreground bg-white shadow-sm">
            Ver Todos los Cursos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cursos.map((curso, index) => (
            <motion.div
              key={curso.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/70 backdrop-blur-lg rounded-3xl border border-white shadow-xl shadow-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-500" />
                <img
                  src={curso.image}
                  alt={curso.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-lg">
                  {curso.icon}
                </div>
              </div>

              <div className="p-8">
                <h4 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{curso.title}</h4>
                <p className="text-muted-foreground mb-6 flex items-center gap-2 font-medium">
                  <Users className="w-4 h-4" /> {curso.profesor}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-foreground">Progreso</span>
                    <span className="text-primary">{curso.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${curso.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full rounded-full ${curso.color} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </div>

                <button className="w-full mt-8 py-3 rounded-2xl bg-primary/5 text-primary font-bold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" /> Continuar Clase
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Muro de la Comunidad
function MuroComunidad() {
  const posts = [
    {
      id: 1,
      author: "Dra. Ana Silva",
      role: "Profesora",
      avatar: "https://i.pravatar.cc/150?u=ana",
      time: "Hace 2 horas",
      content: "¡Hola a todos! Recuerden que mañana tenemos la práctica calificada de Ciencias Físicas II. Subí un material de repaso adicional en la sección de recursos. ¡Éxitos!",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      author: "Centro de Estudiantes",
      role: "Administración",
      avatar: "https://i.pravatar.cc/150?u=admin",
      time: "Hace 5 horas",
      content: "La feria de ciencias e innovación tecnológica será este viernes en el patio principal. ¡No se pierdan los proyectos de fin de ciclo!",
      likes: 56,
      comments: 12
    },
    {
      id: 3,
      author: "Carlos Mendoza",
      role: "Profesor",
      avatar: "https://i.pravatar.cc/150?u=carlos",
      time: "Ayer",
      content: "Excelentes trabajos presentados en la última clase de Matemáticas Avanzadas. Me enorgullece ver el nivel analítico que han alcanzado.",
      likes: 42,
      comments: 8
    }
  ];

  return (
    <section id="comunidad" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold mb-2 uppercase tracking-widest text-sm inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Novedades
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Muro de la Comunidad
          </h3>
        </div>

        <div className="space-y-6">
          {/* Post input simulator */}
          <div className="bg-white rounded-3xl p-6 shadow-lg shadow-border/50 border border-border/50 flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shrink-0">
              E
            </div>
            <input type="text" placeholder="Comparte algo con tu clase..." className="flex-1 bg-muted/50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground" />
          </div>

          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-border/30 border border-white"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={post.avatar} alt={post.author} className="w-14 h-14 rounded-full border-2 border-primary/20" />
                <div>
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    {post.author}
                    <span className="text-xs px-2 py-1 rounded-md bg-secondary text-primary font-medium">{post.role}</span>
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium">{post.time}</p>
                </div>
              </div>

              <p className="text-lg text-foreground mb-6 leading-relaxed">
                {post.content}
              </p>

              <div className="flex items-center gap-6 pt-6 border-t border-border/50">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {post.likes} Me gusta
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
                  <MessageSquare className="w-5 h-5 flex-shrink-0" />
                  {post.comments} Comentarios
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sección de Tareas
function Tareas() {
  const tareasList = [
    {
      id: 1,
      curso: "Matemáticas Avanzadas",
      title: "Resolución de Ecuaciones Diferenciales",
      deadline: "Hoy, 23:59",
      status: "Pendiente",
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: <CircleDashed className="w-5 h-5" />
    },
    {
      id: 2,
      curso: "Ciencias Físicas II",
      title: "Ensayo sobre Termodinámica",
      deadline: "Ayer",
      status: "Entregada",
      color: "bg-green-100 text-green-700 border-green-200",
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
      id: 3,
      curso: "Historia Universal",
      title: "Cuestionario Revolución Industrial",
      deadline: "Hace 3 días",
      status: "Revisada",
      color: "bg-cyan-100 text-cyan-700 border-cyan-200",
      icon: <FileCheck className="w-5 h-5" />
    }
  ];

  return (
    <section id="tareas" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-primary font-bold mb-2 uppercase tracking-widest text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Actividades
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Mis Tareas
            </h3>
          </div>
        </div>

        <div className="grid gap-6">
          {tareasList.map((tarea, index) => (
            <motion.div
              key={tarea.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-xl shadow-border/30 border border-border/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-2xl hover:border-primary/20 transition-all group"
            >
              <div className="flex-1">
                <span className="text-xs font-bold text-primary mb-2 block uppercase tracking-wider">{tarea.curso}</span>
                <h4 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{tarea.title}</h4>
                <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Vence: {tarea.deadline}
                </p>
              </div>

              <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 font-bold ${tarea.color}`}>
                {tarea.icon}
                {tarea.status}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Campus() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <Navigation />
      <main>
        <Hero />
        <MisCursos />
        <MuroComunidad />
        <Tareas />
      </main>
      <Footer />
    </div>
  );
}
