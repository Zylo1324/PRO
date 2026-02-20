import { useState, useEffect, useRef } from "react";
import { 
  auth, 
  db as firestore 
} from "@/lib/firebase";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Phone, MapPin, Info, Loader2, ChevronDown, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

type AuthStep = "login" | "recovery_sent" | "profile" | "loading";

export function AuthModalOrButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<AuthStep>("login");
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchProfile(firebaseUser.uid);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const fetchProfile = async (uid: string) => {
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setProfile(data);
      if (!data.profileComplete) {
        setStep("profile");
        setIsOpen(true);
      }
    } else {
      setStep("profile");
      setIsOpen(true);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({ title: "Bienvenido", description: "Sesión iniciada con Google" });
      setIsOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Intentar login
      await signInWithEmailAndPassword(auth, email, password);
      setIsOpen(false);
    } catch (error: any) {
      if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
        // Si no existe, intentar crear
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          setStep("profile");
        } catch (regError: any) {
          toast({ title: "Error", description: regError.message, variant: "destructive" });
        }
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast({ title: "Email requerido", description: "Ingresa tu correo para restablecer la contraseña", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setStep("recovery_sent");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.length < 3) {
      toast({ title: "Nombre inválido", description: "Mínimo 3 caracteres", variant: "destructive" });
      return;
    }
    if (!/^\d{9}$/.test(whatsapp)) {
      toast({ title: "WhatsApp inválido", description: "Exactamente 9 dígitos", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const userData = {
        uid: user.uid,
        email: user.email,
        fullName,
        whatsapp: `+51${whatsapp}`,
        address,
        reference,
        profileComplete: true,
        updatedAt: serverTimestamp(),
      };
      await setDoc(doc(firestore, "users", user.uid), userData, { merge: true });
      setProfile(userData);
      setIsOpen(false);
      toast({ title: "Perfil completado", description: "Tus datos han sido guardados" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast({ title: "Sesión cerrada", description: "Vuelve pronto" });
  };

  if (loading) return <div className="w-10 h-10 border-2 border-primary border-t-transparent animate-spin rounded-full" />;

  if (user && profile?.profileComplete) {
    const firstName = profile.fullName.split(" ")[0];
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold px-6 py-2 h-auto rounded-none gap-2">
            Hola, {firstName} <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-white/10 text-white p-2 min-w-[160px]">
          <DropdownMenuItem className="focus:bg-primary/20 cursor-pointer gap-2 py-3 px-4">
            <Settings className="w-4 h-4" /> Configuración
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="focus:bg-destructive/20 text-destructive cursor-pointer gap-2 py-3 px-4">
            <LogOut className="w-4 h-4" /> Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-white text-black px-6 py-2 h-auto font-bold hover:bg-primary hover:text-white transition-all duration-300 rounded-none"
      >
        Registrar e Iniciar
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => step !== "profile" && setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-card border border-white/10 p-8 shadow-2xl"
            >
              {step !== "profile" && (
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              )}

              {step === "login" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-display font-bold mb-2">Bienvenido</h2>
                    <p className="text-muted-foreground">Inicia sesión o regístrate para continuar</p>
                  </div>

                  <Button 
                    onClick={handleGoogleLogin}
                    variant="outline" 
                    className="w-full h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white gap-3 rounded-none"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuar con Google
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">O con tu cuenta</span></div>
                  </div>

                  <form onSubmit={handleEmailAuth} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="tu@email.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-white/5 border-white/10 rounded-none h-12"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Contraseña</Label>
                        <button 
                          type="button"
                          onClick={handleResetPassword}
                          className="text-xs text-primary hover:text-white transition-colors"
                        >
                          ¿Olvidaste la contraseña?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="password" 
                          type="password" 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 bg-white/5 border-white/10 rounded-none h-12"
                          required
                        />
                      </div>
                    </div>
                    <Button 
                      disabled={isSubmitting}
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-none"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Ingresar / Registrar"}
                    </Button>
                  </form>
                </div>
              )}

              {step === "recovery_sent" && (
                <div className="text-center space-y-6 py-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-display font-bold">Email Enviado</h2>
                  <p className="text-muted-foreground">Hemos enviado un enlace para restablecer tu contraseña a {email}.</p>
                  <Button 
                    variant="link" 
                    onClick={() => setStep("login")}
                    className="text-primary hover:text-white"
                  >
                    Volver al inicio
                  </Button>
                </div>
              )}

              {step === "profile" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-display font-bold mb-2">Completa tu perfil</h2>
                    <p className="text-muted-foreground">Necesitamos unos datos adicionales para continuar</p>
                  </div>

                  <form onSubmit={handleCompleteProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nombre Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="fullName" 
                          placeholder="Tu nombre completo" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10 bg-white/5 border-white/10 rounded-none h-12"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp (9 dígitos)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="whatsapp" 
                          placeholder="999888777" 
                          maxLength={9}
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
                          className="pl-10 bg-white/5 border-white/10 rounded-none h-12"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="address" 
                          placeholder="Av. Ejemplo 123" 
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="pl-10 bg-white/5 border-white/10 rounded-none h-12"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reference">Referencia</Label>
                      <div className="relative">
                        <Info className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="reference" 
                          placeholder="Frente al parque..." 
                          value={reference}
                          onChange={(e) => setReference(e.target.value)}
                          className="pl-10 bg-white/5 border-white/10 rounded-none h-12"
                          required
                        />
                      </div>
                    </div>
                    <Button 
                      disabled={isSubmitting}
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-none"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Guardar Perfil"}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
