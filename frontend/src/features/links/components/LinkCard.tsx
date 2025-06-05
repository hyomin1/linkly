import { useState } from 'react';
import EditLinkForm from './EditLinkForm';
import Modal from '../../../components/common/Modal';
import DropdownMenu from '../../../components/ui/DropdownMenu';
import type { Link } from '../../../types/link';
import { useToggleFavorite } from '../hooks/useToggleFavorite';
import FavoriteButton from './FavoriteButton';
import LinkThumbnail from './LinkThumbnail';
import LinkDescription from './LinkDescription';
import LinkDomain from './LinkDomain';
import LinkMeta from './LinkMeta';
import LinkTitle from './LinkTitle';

interface Props {
  link: Link;
  onDelete: (id: number) => void;
  onEdit: (args: {
    id: number;
    data: { title?: string; url?: string };
  }) => void;
}

export default function LinkCard({ link, onDelete, onEdit }: Props) {
  const { id, url, title, description, image, siteName, isFavorite } = link;
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: toggleFavoriteMutate } = useToggleFavorite();

  return (
    <li className='group relative bg-gray-800 border border-gray-700 rounded-xl overflow-visible hover:shadow-lg hover:shadow-black/50 hover:border-gray-600 transition-all duration-300'>
      <div className='absolute top-3 right-3 z-10 flex gap-1'>
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={() => toggleFavoriteMutate(id)}
        />
      </div>

      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='block group/link'
      >
        <LinkThumbnail image={image} title={title} />

        <div className='px-4 sm:px-5 pt-4 sm:pt-5 space-y-2 sm:space-y-3'>
          <div className='flex items-center justify-between'>
            <LinkMeta siteName={siteName} url={url} />
            <DropdownMenu
              onEdit={() => setIsEditing(true)}
              onDelete={() => onDelete(id)}
            />
          </div>

          <LinkTitle title={title} />
        </div>
      </a>

      <div className='px-4 sm:px-5 pb-4 sm:pb-5 space-y-2'>
        <LinkDescription description={description} />

        <LinkDomain siteName={siteName} url={url} />
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
