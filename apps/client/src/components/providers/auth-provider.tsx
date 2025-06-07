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
import { toast } from "sonner";
import { useQueryGetUser } from "@/api/useQueryGetUser";
import { useQueryClient } from "@tanstack/react-query";
import { useQueryGetUserProfile } from "@/api/useQueryGetUserProfile";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: systemUser } = useQueryGetUser(Boolean(firebaseUser));
  const { data: userProfile } = useQueryGetUserProfile(Boolean(systemUser));

  const queryClient = useQueryClient();

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
      setIsLoginDialogOpen(true);
      localStorage.removeItem("emailForSignIn");
    } catch (error) {
      toast("Please try again");
    }
  };

  // Sign in with google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setFirebaseUser(result?.user);
      setIsLoginDialogOpen(false);
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
    try {
      await signOut(auth);
      setFirebaseUser(null);

      queryClient.removeQueries({ queryKey: ["user"], exact: true });
      queryClient.removeQueries({ queryKey: ["profile"], exact: true });
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    } finally {
    }
  };

  const value = useMemo(
    () => ({
      firebaseUser,
      signInWithGoogle,
      logout,
      loginWithLink,
      isLoginDialogOpen,
      setIsLoginDialogOpen,
      systemUser,
      userProfile,
      loading,
      setLoading,
    }),
    [
      firebaseUser,
      signInWithGoogle,
      logout,
      loginWithLink,
      isLoginDialogOpen,
      setIsLoginDialogOpen,
      systemUser,
      userProfile,
      loading,
      setLoading,
    ]
  );

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      handleSignInWithEmailLink();
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      setIsLoginDialogOpen(false);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
