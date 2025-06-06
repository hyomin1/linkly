import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Edit2, Trash2, MoreVertical } from 'lucide-react';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function DropdownMenu({ onEdit, onDelete }: Props) {
  return (
    <Menu as='div' className='relative z-20'>
      <MenuButton
        className='p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white'
        title='더보기'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <MoreVertical className='w-4 h-4' />
      </MenuButton>

      <MenuItems className='absolute right-0 mt-2 w-36 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-30 focus:outline-none divide-y divide-gray-600'>
        <div className='px-1 py-1'>
          <MenuItem
            as='button'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
            }}
            className='group flex w-full items-center rounded-md px-4 py-2 text-sm space-x-2 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors'
          >
            <Edit2 className='w-4 h-4' />
            <span>수정</span>
          </MenuItem>

          <MenuItem
            as='button'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            className='group flex w-full items-center rounded-md px-4 py-2 text-sm space-x-2 text-red-400 hover:bg-gray-600 hover:text-red-300 transition-colors'
          >
            <Trash2 className='w-4 h-4' />
            <span>삭제</span>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
