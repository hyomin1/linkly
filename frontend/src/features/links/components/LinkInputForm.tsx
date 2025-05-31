import React, { useState } from 'react';
import { useCreateLink } from '../hooks/useCreateLink';

export default function LinkInputForm() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const { mutate, isPending, isSuccess, error } = useCreateLink();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      alert('제목과 URL을 모두 입력해주세요.');
      return;
    }
    mutate(
      { url, title },
      {
        onSuccess: () => {
          setTitle('');
          setUrl('');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <input
        type='text'
        placeholder='링크 제목'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='border px-3 py-2 rounded w-full'
      />
      <input
        type='url'
        placeholder='https://example.com'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className='border px-3 py-2 rounded w-full'
      />
      <button
        type='submit'
        disabled={isPending}
        className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50'
      >
        {isPending ? '등록중...' : '등록'}
      </button>

      {isSuccess && <p className='text-green-600'>✅ 링크 등록 완료!</p>}
      {error && <p className='text-red-600'>❌ {error.message}</p>}
    </form>
  );
}
