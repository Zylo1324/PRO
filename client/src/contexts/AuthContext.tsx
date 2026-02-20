import { createContext, useContext, useState, ReactNode } from "react";
import { useLocation } from "wouter";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
    showGatekeeper: boolean;
    setShowGatekeeper: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showGatekeeper, setShowGatekeeper] = useState(false);
    const [, setLocation] = useLocation();

    const login = (password: string) => {
        if (password === "Super Zylo") {
            setIsAuthenticated(true);
            setShowGatekeeper(false);
            setLocation("/campus");
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setLocation("/");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, showGatekeeper, setShowGatekeeper }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
