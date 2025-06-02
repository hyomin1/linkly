import React, { useState } from 'react';
import { Plus, Link as LinkIcon } from 'lucide-react';
import { useCreateLink } from '../hooks/useCreateLink';

export default function LinkInputForm() {
  const [url, setUrl] = useState('');

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
      alert(' URL을 입력해주세요.');
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

  return (
    <div className='bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 shadow-lg'>
      <div className='flex items-center space-x-3 mb-5 sm:mb-6'>
        <div className='w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
          <Plus className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
        </div>
        <h3 className='text-lg sm:text-xl font-semibold text-white'>
          새 링크 추가
        </h3>
      </div>

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
              className='w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 text-sm sm:text-base'
            />
          </div>
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-2.5 sm:py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm sm:text-base'
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
  );
}
