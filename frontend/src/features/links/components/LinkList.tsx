import { useGetLinks } from '../hooks/useGetLinks';
import LinkCard from './LinkCard';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import EmptyState from '../../../components/ui/EmptyState';
import { useDeleteLink } from '../hooks/useDeleteLink';
import { useUpdateLink } from '../hooks/useUpdateLink';

export default function LinkList() {
  const { data: links, isLoading, error } = useGetLinks();
  const { mutate: deleteLink } = useDeleteLink();
  const { mutate: updateLink } = useUpdateLink();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }
  if (!links || links.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className='space-y-4'>
      {links.map((link) => (
        <LinkCard
          key={link.id}
          id={link.id}
          title={link.title}
          url={link.url}
          onDelete={deleteLink}
          onEdit={updateLink}
        />
      ))}
    </ul>
  );
}
