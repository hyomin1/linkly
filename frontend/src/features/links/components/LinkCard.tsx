import { Globe, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import EditLinkModal from './EditLinkModal';

interface Props {
  id: number;
  title: string;
  url: string;
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

        <div className='flex items-center space-x-2 flex-shrink-0'>
          {/* 메뉴 버튼 */}
          <div className='relative'>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className='p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white transition-all duration-200'
            >
              <MoreVertical className='w-4 h-4' />
            </button>

            {/* 드롭다운 메뉴 */}
            {showMenu && (
              <div className='absolute right-0 top-full mt-2 w-36 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10'>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setIsEditing(true);
                  }}
                  className='w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded-t-lg transition-colors'
                >
                  <Edit2 className='w-4 h-4' />
                  <span>수정</span>
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDelete(id);
                  }}
                  className='w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-600 rounded-b-lg transition-colors'
                >
                  <Trash2 className='w-4 h-4' />
                  <span>삭제</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isEditing && (
        <EditLinkModal
          initialTitle={title}
          initialUrl={url}
          onClose={() => setIsEditing(false)}
          onSave={(data) => onEdit({ id, data })}
        />
      )}
    </li>
  );
}
