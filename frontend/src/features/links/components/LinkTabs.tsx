import type { Favorite } from '../types/link';

interface TabOption {
  label: string;
  value: Favorite;
}

interface LinkTabsProps {
  tabs: TabOption[];
  activeTab: string;
  onTabChange: (value: Favorite) => void;
}

export default function LinkTabs({
  tabs,
  activeTab,
  onTabChange,
}: LinkTabsProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
              ${
                activeTab === tab.value
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
              }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
