import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import Login06 from "../ui/login-3";

const LoginDialog = ({ isOpen, onClose }) => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='shadow-none sm:max-w-2xl w-[90%]'>
        <DialogTitle hidden />
        <Login06 setIsEmailSent={setIsEmailSent} />
      </DialogContent>
    </Dialog>
  );
};

export { LoginDialog };
