import { Loader2 } from "lucide-react";

const FullScreenLoader = ({ message }: { message?: string }) => {
  return (
    <div className='flex h-dvh items-center justify-center flex-col gap-2'>
      <Loader2 className='animate-spin' />
      {message && <div>{message}</div>}
    </div>
  );
};

export default FullScreenLoader;
