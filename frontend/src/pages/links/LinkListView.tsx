import LinkList from '../../features/links/components/LinkList';

export default function LinkListPage() {
  return (
    <div className='max-w-screen-md mx-auto p-4 space-y-6'>
      <h2 className='text-2xl font-bold text-white'>링크 목록</h2>
      <LinkList />
    </div>
  );
}
