import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCreateLink } from '../../hooks/useCreateLink';
import { useGetCategories } from '../../../categories/hooks/useGetCategories';
import CategorySelect from '../../../categories/components/CategorySelect';
import UrlInput from './UrlInput';

export default function LinkForm() {
  const [url, setUrl] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { mutate, isPending } = useCreateLink();
  const { data: categories = [] } = useGetCategories();

  const formatUrl = (url: string) =>
    /^https?:\/\//i.test(url) ? url : `https://${url}`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) {
      alert('URL을 입력해주세요.');
      return;
    }
    const formattedUrl = formatUrl(url);
    mutate(
      { url: formattedUrl, categoryId },
      {
        onSuccess: () => {
          setUrl('');
          setCategoryId(null);
        },
      }
    );
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedUrl =
      e.dataTransfer.getData('text/uri-list') ||
      e.dataTransfer.getData('text/plain');
    if (droppedUrl.startsWith('http')) {
      mutate({ url: formatUrl(droppedUrl), categoryId });
    }
  };

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`transition-colors ${isDragging ? 'bg-blue-900/10' : ''}`}
    >
      <div className='bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg'>
        <p className='text-sm text-gray-400 text-center mb-4'>
          링크를 입력하거나{' '}
          <span className='text-blue-400 font-medium'>여기로 드래그</span>해서
          등록할 수 있어요
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <CategorySelect
            categories={categories}
            selectedId={categoryId}
            onChange={setCategoryId}
          />
          <UrlInput url={url} onChange={setUrl} />

          <button
            type='submit'
            disabled={isPending}
            className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl'
          >
            {isPending ? (
              <>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                <span>저장 중...</span>
              </>
            ) : (
              <>
                <Plus className='w-4 h-4' />
                <span>링크 저장</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
