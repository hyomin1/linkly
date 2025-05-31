import { Bookmark } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className='text-center py-12'>
      <div className='w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4'>
        <Bookmark className='w-8 h-8 text-gray-400' />
      </div>
      <h3 className='text-xl font-semibold text-gray-300 mb-2'>
        저장된 링크가 없습니다
      </h3>
      <p className='text-gray-400'>첫 번째 링크를 추가해보세요!</p>
    </div>
  );
}
