import type { Category } from '../../links/types/link';
import { ChevronDown, Tag, Check, Sparkles } from 'lucide-react';

interface Props {
  categories: Category[];
  selectedId: number | null;
  onChange: (id: number | null) => void;
}

export default function CategorySelect({
  categories,
  selectedId,
  onChange,
}: Props) {
  return (
    <div className='space-y-3'>
      <label
        htmlFor='category'
        className='flex items-center gap-2 text-sm font-semibold text-white tracking-wide'
      >
        <Tag className='w-4 h-4 text-blue-400' />
        카테고리
      </label>

      <div className='relative'>
        <select
          id='category'
          value={selectedId ?? ''}
          onChange={(e) =>
            onChange(e.target.value ? Number(e.target.value) : null)
          }
          className='w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer pr-10'
        >
          <option value=''>카테고리 선택</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className='pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2'>
          <ChevronDown className='w-4 h-4 text-gray-400' />
        </div>
      </div>

      <div className='flex items-center gap-2 text-xs text-gray-400 ml-1'>
        {selectedId ? (
          <>
            <Check className='w-3 h-3 text-green-400' />
            <span>
              선택된 카테고리:{' '}
              {categories.find((c) => c.id === selectedId)?.name || ''}
            </span>
          </>
        ) : (
          <>
            <Sparkles className='w-3 h-3 text-gray-400' />
            <span>카테고리를 선택해주세요</span>
          </>
        )}
      </div>
    </div>
  );
}
