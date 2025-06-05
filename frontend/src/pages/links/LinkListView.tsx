import { useState } from 'react';
import LinkList from '../../features/links/components/LinkList';

const tabs = [
  { label: '전체 링크', value: 'all' },
  { label: '즐겨찾기', value: 'favorite' },
] as const;

export default function LinkListPage() {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]['value']>('all');

  return (
    <div className='max-w-screen-md mx-auto p-4 space-y-6'>
      <h2 className='text-2xl font-bold text-white'>링크 목록</h2>

      {/* 탭 버튼 */}
      <div className='flex space-x-2'>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 링크 리스트 */}
      <LinkList type={activeTab} />
    </div>
  );
}
