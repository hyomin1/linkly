export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className='bg-red-900/50 border border-red-700 rounded-xl p-6 text-center'>
      <div className='w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4'>
        <span className='text-white text-xl'>!</span>
      </div>
      <p className='text-red-400 font-medium'>에러가 발생했습니다</p>
      <p className='text-red-300 text-sm mt-1'>{message}</p>
    </div>
  );
}
