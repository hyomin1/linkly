import React, { useState } from 'react';
import { Plus, Link as LinkIcon } from 'lucide-react';
import { useCreateLink } from '../hooks/useCreateLink';

export default function LinkInputForm() {
  const [url, setUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const { mutate, isPending } = useCreateLink();

  const formatUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) {
      alert('URL을 입력해주세요.');
      return;
    }
    const formattedUrl = formatUrl(url);
    mutate(
      { url: formattedUrl },
      {
        onSuccess: () => {
          setUrl('');
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
      mutate({ url: formatUrl(droppedUrl) });
    }
  };

  return (
    // ✅ 드롭 인식 가능한 최상단 div
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`transition-colors ${isDragging ? 'bg-blue-900/10' : ''}`}
    >
      {/* 내부 폼 컨테이너 */}
      <div className='bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg'>
        <div className='flex items-center space-x-3 mb-6'>
          <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
            <Plus className='w-5 h-5 text-white' />
          </div>
          <h3 className='text-xl font-semibold text-white'>새 링크 추가</h3>
        </div>

        <p className='text-sm text-gray-400 text-center mb-4'>
          링크를 입력하거나{' '}
          <span className='text-blue-400 font-medium'>여기로 드래그</span>해서
          등록할 수 있어요
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='url' className='text-sm font-medium text-gray-300'>
              URL
            </label>
            <div className='relative'>
              <LinkIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <input
                id='url'
                type='text'
                placeholder='https://example.com'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className='w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400'
              />
            </div>
          </div>

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
    </div>
  );
}
