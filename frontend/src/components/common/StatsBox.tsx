import { Bookmark, Star, Folder } from 'lucide-react';
import { useGetLinks } from '../../features/links/hooks/useGetLinks';
import { useFavoriteLinks } from '../../features/links/hooks/useFavoriteLinks';

export default function StatsBox() {
  const { data: links } = useGetLinks();
  const { data: favorites } = useFavoriteLinks();

  const total = links?.length || 0;
  const favoritesCount = favorites?.length || 0;
  const categoryCount = 0;
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
            <p className='text-gray-400 text-sm'>즐겨찾기</p>
            <p className='text-3xl font-bold mt-1'>{favoritesCount}</p>
          </div>
          <Star className='w-8 h-8 text-yellow-400' />
        </div>
      </div>

      <div className='bg-gray-800 rounded-xl p-6 border border-gray-700'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-gray-400 text-sm'>카테고리</p>
            <p className='text-3xl font-bold mt-1'>{categoryCount}</p>
          </div>
          <Folder className='w-8 h-8 text-teal-400' />
        </div>
      </div>
    </div>
  );
}
