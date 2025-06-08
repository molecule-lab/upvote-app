"use client";

import Login06 from "@/components/ui/login-3";
import { useEffect, useState } from "react";
import { EmailVerify } from "./email-verify";
import useAuth from "@/hooks/use-auth";
import FullScreenLoader from "@/components/ui/full-screen-loader";

export default function SignUp() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { signInWithGoogle, loginWithLink, loading, firebaseUser } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("emailForSignIn")) {
      setIsEmailSent(true);
    } else {
      setIsEmailSent(false);
    }
  }, []);

  if ((loading && !firebaseUser) || (firebaseUser && !loading)) {
    return <FullScreenLoader />;
  }

  if (isEmailSent) {
    return <EmailVerify setIsEmailSent={setIsEmailSent} />;
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900'>
      <Login06
        setIsEmailSent={setIsEmailSent}
        signInWithGoogle={signInWithGoogle}
        loginWithLink={loginWithLink}
      />
    </div>
  );
}
