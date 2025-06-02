import { Bookmark, Plus, Clock } from 'lucide-react';
import { useGetLinks } from '../../features/links/hooks/useGetLinks';

export default function StatsBox() {
  const { data: links } = useGetLinks();

  const total = links?.length;
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
      <div className='bg-gray-800 rounded-xl p-6 border border-gray-700'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-gray-400 text-sm'>총 링크</p>
            <p className='text-3xl font-bold mt-1'>{total}</p>
          </div>
          <Bookmark className='w-8 h-8 text-blue-400' />
        </div>
      </div>
      <div className='bg-gray-800 rounded-xl p-6 border border-gray-700'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-gray-400 text-sm'>이번 주 추가</p>
            <p className='text-3xl font-bold mt-1'>5</p>
          </div>
          <Plus className='w-8 h-8 text-green-400' />
        </div>
      </div>
      <div className='bg-gray-800 rounded-xl p-6 border border-gray-700'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-gray-400 text-sm'>최근 활동</p>
            <p className='text-3xl font-bold mt-1'>2시간</p>
          </div>
          <Clock className='w-8 h-8 text-purple-400' />
        </div>
      </div>
    </div>
  );
}
