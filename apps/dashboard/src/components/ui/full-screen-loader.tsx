import { Loader2 } from "lucide-react";
import Logo from "../icons/logo";

const FullScreenLoader = ({ message }: { message?: string }) => {
  return (
    <div className='flex h-dvh items-center justify-center flex-col gap-2'>
      <Logo className='animate-spin animation-duration-[2s]' />
      {message && <div>{message}</div>}
    </div>
  );
};

export default FullScreenLoader;
