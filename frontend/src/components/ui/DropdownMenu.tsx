import { Edit2, Trash2 } from 'lucide-react';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function DropdownMenu({ onEdit, onDelete }: Props) {
  return (
    <div className='absolute right-0 top-full mt-2 w-36 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10'>
      <button
        onClick={onEdit}
        className='w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded-t-lg transition-colors'
      >
        <Edit2 className='w-4 h-4' />
        <span>수정</span>
      </button>
      <button
        onClick={onDelete}
        className='w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-600 rounded-b-lg transition-colors'
      >
        <Trash2 className='w-4 h-4' />
        <span>삭제</span>
      </button>
    </div>
  );
}
