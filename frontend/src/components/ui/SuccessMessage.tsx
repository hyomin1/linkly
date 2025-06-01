export default function SuccessMessage() {
  return (
    <div className='flex items-center space-x-2 p-3 bg-green-900/50 border border-green-700 rounded-lg'>
      <div className='w-4 h-4 bg-green-500 rounded-full flex items-center justify-center'>
        <div className='w-1.5 h-1.5 bg-white rounded-full' />
      </div>
      <span className='text-green-400 text-sm'>
        링크가 성공적으로 등록되었습니다!
      </span>
    </div>
  );
}
