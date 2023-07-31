import { User, onAuthStateChanged, getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type ContextState = {
    user: User | null;
    status: "loading" | "done";
};

const AuthContext = createContext<ContextState | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<"loading" | "done">("loading");
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user), setStatus("done");
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, status }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useUser() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a AuthProvider");
    }
    return context;
}
