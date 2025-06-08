"use client";
import { useEffect, useMemo, useState } from "react";
import AuthContext from "../contexts/auth-context";
import {
  getAuth,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryGetUser } from "@/api/useQuerySystemUser";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const { data: systemUser } = useQueryGetUser(Boolean(firebaseUser));

  const handleSignInWithEmailLink = async () => {
    try {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      const data = await signInWithEmailLink(
        auth,
        email || "",
        window.location.href
      );

      setFirebaseUser(data.user);
      localStorage.removeItem("emailForSignIn");
      router.replace("/plans");
    } catch (error) {
      toast("Please try again");
    }
  };

  // Sign in with google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setFirebaseUser(result?.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // Handle specific errors like popup closed by user, etc.
      throw error;
    }
  };

  // Login in with link
  const loginWithLink = async (email: string) => {
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: window.location.origin,
        handleCodeInApp: true,
      });

      localStorage.setItem("emailForSignIn", email);
      toast("Please check your inbox for a link to sign in");
    } catch (error) {
      toast("Please try again");
      // Handle errors appropriately (e.g., show message to user)
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setFirebaseUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      firebaseUser,
      signInWithGoogle,
      logout,
      loginWithLink,
      loading,
      systemUser,
    }),
    [firebaseUser, signInWithGoogle, logout, loginWithLink, loading, systemUser]
  );

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      handleSignInWithEmailLink();
    }
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      console.log(currentUser);
      setLoading(false); // Set loading to false once auth state is determined

      if (currentUser) {
        router.replace("/plans");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs only once on mount

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
