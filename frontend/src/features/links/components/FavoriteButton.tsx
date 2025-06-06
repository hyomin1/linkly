import { Bookmark } from 'lucide-react';

interface Props {
  isFavorite: boolean;
  onClick: () => void;
}

export default function FavoriteButton({ isFavorite, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className='p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-yellow-400'
      title='즐겨찾기'
    >
      <Bookmark
        className='w-4 h-4'
        color={isFavorite ? '#facc15' : '#9ca3af'}
        fill={isFavorite ? '#facc15' : 'none'}
      />
    </button>
  );
}
