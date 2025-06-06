import { useState } from 'react';
import LinkList from './LinkList';
import SearchInput from './SearchInput';
import LinkTabs from './LinkTabs';
import type { Favorite } from '../types/link';

const tabs: { label: string; value: Favorite }[] = [
  { label: '전체 링크', value: 'all' },
  { label: '즐겨찾기', value: 'favorite' },
];

export default function LinkListSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'favorite'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='max-w-screen-md mx-auto px-4 py-8 space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <LinkTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />

        <div className='w-full sm:w-64'>
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      <LinkList type={activeTab} searchQuery={searchQuery} />
    </div>
  );
}
