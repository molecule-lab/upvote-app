import AuthContext from "@/components/contexts/auth-context";
import { useContext } from "react";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
