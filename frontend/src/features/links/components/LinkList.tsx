import { useGetLinks } from '../hooks/useGetLinks';
import LinkCard from './LinkCard';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import EmptyState from '../../../components/ui/EmptyState';

export default function LinkList() {
  const { data: links, isLoading, error } = useGetLinks();
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
        <LinkCard key={link.id} title={link.title} url={link.url} />
      ))}
    </ul>
  );
}
