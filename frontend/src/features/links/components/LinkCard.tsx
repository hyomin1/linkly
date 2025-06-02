import { Globe, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import EditLinkForm from './EditLinkForm';
import Modal from '../../../components/common/Modal';
import DropdownMenu from '../../../components/ui/DropdownMenu';
import type { Link } from '../../../types/link';

interface Props extends Pick<Link, 'id' | 'title' | 'url'> {
  onDelete: (id: number) => void;
  onEdit: (args: {
    id: number;
    data: { title?: string; url?: string };
  }) => void;
}

export default function LinkCard({ id, title, url, onDelete, onEdit }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };
  return (
    <li className='bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 hover:shadow-lg transition-all duration-200 group relative'>
      <div className='flex items-start justify-between'>
        <div className='flex-1 min-w-0 pr-4'>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='block group-hover:text-blue-400 transition-colors'
          >
            <h3 className='text-white text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors'>
              {title}
            </h3>
          </a>
          <div className='flex items-center space-x-2 text-gray-400 text-sm'>
            <Globe className='w-4 h-4' />
            <span className='truncate'>{getDomain(url)}</span>
          </div>
        </div>

        <div className='flex items-center space-x-2 flex-shrink-0 '>
          <div className='relative'>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className='p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white transition-all duration-200'
            >
              <MoreVertical className='w-4 h-4' />
            </button>
            {showMenu && (
              <DropdownMenu
                onEdit={() => {
                  setShowMenu(false);
                  setIsEditing(true);
                }}
                onDelete={() => {
                  setShowMenu(false);
                  onDelete(id);
                }}
              />
            )}
          </div>
        </div>
      </div>
      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <EditLinkForm
            initialTitle={title}
            initialUrl={url}
            onSave={(data) => {
              onEdit({ id, data });
              setIsEditing(false);
            }}
            onClose={() => setIsEditing(false)}
          />
        </Modal>
      )}
    </li>
  );
}
