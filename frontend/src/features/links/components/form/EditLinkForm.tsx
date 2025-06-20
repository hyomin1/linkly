import { useState } from 'react';
import type { Category } from '../../types/link';
import CategorySelect from '../../../categories/components/CategorySelect';

interface Props {
  initialTitle: string;
  initialUrl: string;
  categories: Category[];
  initialCategoryId: number | null;
  onClose: () => void;
  onSave: (data: {
    title: string;
    url: string;
    categoryId: number | null;
  }) => void;
}

export default function EditLinkForm({
  initialTitle,
  initialUrl,
  categories,
  initialCategoryId,
  onClose,
  onSave,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [url, setUrl] = useState(initialUrl);
  const [categoryId, setCategoryId] = useState<number | null>(
    initialCategoryId
  );

  return (
    <div className='bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg'>
      <h2 className='text-white text-lg font-semibold mb-4'>링크 수정</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ title, url, categoryId });
          onClose();
        }}
        className='space-y-4'
      >
        <div>
          <label className='block text-sm text-gray-300 mb-1'>제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='링크 제목'
            required
          />
        </div>

        <div>
          <label className='block text-sm text-gray-300 mb-1'>URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='https://example.com'
            required
          />
        </div>
        <CategorySelect
          categories={categories}
          selectedId={categoryId}
          onChange={setCategoryId}
        />

        <div className='flex justify-end space-x-2 pt-2'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition'
          >
            취소
          </button>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition'
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
