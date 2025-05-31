import React from 'react';
import LinkList from '../../features/links/components/LinkList';

export default function LinkListPage() {
  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>링크 목록</h2>
      <LinkList />
    </div>
  );
}
