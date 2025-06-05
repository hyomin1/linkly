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
          <MenuItem>
            {({ active }) => (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit();
                }}
                className={`${
                  active ? 'bg-gray-600 text-white' : 'text-gray-300'
                } group flex w-full items-center rounded-md px-4 py-2 text-sm space-x-2 transition-colors`}
              >
                <Edit2 className='w-4 h-4' />
                <span>수정</span>
              </button>
            )}
          </MenuItem>

          <MenuItem>
            {({ active }) => (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete();
                }}
                className={`${
                  active ? 'bg-gray-600 text-red-300' : 'text-red-400'
                } group flex w-full items-center rounded-md px-4 py-2 text-sm space-x-2 transition-colors`}
              >
                <Trash2 className='w-4 h-4' />
                <span>삭제</span>
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
