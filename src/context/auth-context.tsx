"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { UserProfile } from "@/types";

interface AuthContextType {
    user: User | null; // Firebase Auth User
    profile: UserProfile | null; // Firestore User Profile
    loading: boolean;
    isAdmin: boolean;
    logout: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Helper to fetch/create profile via API
async function fetchOrCreateProfile(firebaseUser: User): Promise<UserProfile | null> {
    try {
        const token = await firebaseUser.getIdToken();

        // Try to fetch existing profile
        const response = await fetch("/api/user/profile", {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error("Failed to fetch profile:", response.statusText);
            return null;
        }

        const data = await response.json();

        if (data.exists) {
            return data.profile as UserProfile;
        }

        // Create new profile
        const newProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            role: "user", // Default role
            fullName: firebaseUser.displayName || "",
            photoURL: firebaseUser.photoURL || "",
            createdAt: new Date().toISOString(),
        };

        const createResponse = await fetch("/api/user/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(newProfile),
        });

        if (!createResponse.ok) {
            console.error("Failed to create profile:", createResponse.statusText);
            return null;
        }

        return newProfile;
    } catch (error) {
        console.error("Error in fetchOrCreateProfile:", error);
        return null;
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                // Fetch user profile via API
                const userProfile = await fetchOrCreateProfile(firebaseUser);
                setProfile(userProfile);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        setProfile(null);
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const isAdmin = profile?.role === "admin" || profile?.role === "super_admin";

    return (
        <AuthContext.Provider value={{ user, profile, loading, isAdmin, logout, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
