import { useGetLinks } from '../hooks/useGetLinks';
import { useFavoriteLinks } from '../hooks/useFavoriteLinks';
import { useDeleteLink } from '../hooks/useDeleteLink';
import { useUpdateLink } from '../hooks/useUpdateLink';
import LinkCard from './card/LinkCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ErrorMessage from '../../../components/common/ErrorMessage';
import EmptyState from '../../../components/common/EmptyState';
import { useMemo } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import type { Favorite } from '../types/link';

interface Props {
  type: Favorite;
  searchQuery: string;
}

export default function LinkList({ type, searchQuery }: Props) {
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
  const debounceQuery = useDebounce(searchQuery, 300);

  const filteredLinks = useMemo(() => {
    const lowerQuery = debounceQuery.toLowerCase();
    return links?.filter(
      (link) =>
        link.title.toLowerCase().includes(lowerQuery) ||
        (link.siteName ?? '').toLowerCase().includes(lowerQuery)
    );
  }, [links, debounceQuery]);

  const { mutate: deleteLink } = useDeleteLink();
  const { mutate: updateLink } = useUpdateLink();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!filteredLinks || filteredLinks.length === 0)
    return (
      <EmptyState
        message={
          searchQuery ? '검색 결과가 없습니다.' : '저장된 링크가 없습니다.'
        }
      />
    );

  return (
    <ul className='space-y-4'>
      {filteredLinks?.map((link) => (
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
