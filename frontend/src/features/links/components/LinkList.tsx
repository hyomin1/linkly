import { useGetLinks } from '../hooks/useGetLinks';

export default function LinkList() {
  const { data: links, isLoading, error } = useGetLinks();
  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  if (!links || links.length === 0) return <p>링크가 없습니다.</p>;
  return (
    <ul className='space-y-4'>
      {links.map((link) => (
        <li key={link.id} className='border p-4 rounded'>
          <a
            href={link.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 underline'
          >
            {link.title}
          </a>
          <p className='text-gray-500 text-sm'>{link.url}</p>
        </li>
      ))}
    </ul>
  );
}
