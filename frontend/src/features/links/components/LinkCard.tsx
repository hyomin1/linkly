import { Globe, MoreVertical, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import EditLinkForm from './EditLinkForm';
import Modal from '../../../components/common/Modal';
import DropdownMenu from '../../../components/ui/DropdownMenu';
import type { Link } from '../../../types/link';

interface Props {
  link: Link;
  onDelete: (id: number) => void;
  onEdit: (args: {
    id: number;
    data: { title?: string; url?: string };
  }) => void;
}

export default function LinkCard({ link, onDelete, onEdit }: Props) {
  const { id, url, title, description, image, siteName } = link;
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
    <li className='group relative bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/50 hover:border-gray-600 transition-all duration-300'>
      <div className='absolute top-3 right-3 z-10'>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className='p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100'
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

      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='block group/link'
      >
        {image && (
          <div className='relative overflow-hidden'>
            <img
              src={image}
              alt={title}
              className='w-full h-36 sm:h-48 object-cover group-hover/link:scale-105 transition-transform duration-500'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-300' />
          </div>
        )}

        <div className='px-4 sm:px-5 pt-4 sm:pt-5 space-y-2 sm:space-y-3'>
          {siteName ? (
            <span className='inline-block text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full text-xs font-medium'>
              {siteName}
            </span>
          ) : (
            <div className='flex items-center gap-1 text-xs text-gray-400'>
              <Globe className='w-3 h-3' />
              <span className='truncate'>{getDomain(url)}</span>
            </div>
          )}

          <h3 className='text-white text-base sm:text-lg font-bold line-clamp-2 group-hover/link:text-blue-400 transition-colors duration-200 leading-tight'>
            {title}
            <ExternalLink className='inline-block w-4 h-4 ml-1 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200' />
          </h3>
        </div>
      </a>

      <div className='px-4 sm:px-5 pb-4 sm:pb-5 space-y-2'>
        {description && (
          <p className='text-gray-400 text-sm line-clamp-2 leading-relaxed'>
            {description}
          </p>
        )}

        {siteName && (
          <div className='flex items-center gap-1 text-xs text-gray-500'>
            <Globe className='w-3 h-3' />
            <span className='truncate'>{getDomain(url)}</span>
          </div>
        )}
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
