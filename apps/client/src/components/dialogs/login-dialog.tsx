import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import Login06 from "../ui/login-3";

const LoginDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='shadow-none sm:max-w-2xl w-[90%]'>
        <DialogTitle hidden />
        <Login06 />
      </DialogContent>
    </Dialog>
  );
};

export { LoginDialog };
