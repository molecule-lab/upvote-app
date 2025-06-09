// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      <span className='ml-2'>Loading...</span>
    </div>
  );
}
