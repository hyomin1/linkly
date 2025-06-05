import { useGetLinks } from '../hooks/useGetLinks';
import { useFavoriteLinks } from '../hooks/useFavoriteLinks';
import { useDeleteLink } from '../hooks/useDeleteLink';
import { useUpdateLink } from '../hooks/useUpdateLink';
import LinkCard from './LinkCard';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import EmptyState from '../../../components/ui/EmptyState';

interface Props {
  type: 'all' | 'favorite';
}

export default function LinkList({ type }: Props) {
  const {
    data: allLinks,
    isLoading: loadingAll,
    error: errorAll,
  } = useGetLinks();

  const {
    data: favoriteLinks,
    isLoading: loadingFav,
    error: errorFav,
  } = useFavoriteLinks();

  const links = type === 'all' ? allLinks : favoriteLinks;
  const isLoading = type === 'all' ? loadingAll : loadingFav;
  const error = type === 'all' ? errorAll : errorFav;

  const { mutate: deleteLink } = useDeleteLink();
  const { mutate: updateLink } = useUpdateLink();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!links || links.length === 0) return <EmptyState />;

  return (
    <ul className='space-y-4'>
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          onDelete={deleteLink}
          onEdit={updateLink}
        />
      ))}
    </ul>
  );
}
