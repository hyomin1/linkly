import React, { useState } from 'react';
import { useCreateLink } from '../hooks/useCreateLink';

export default function LinkInputForm() {
  const [url, setUrl] = useState('');

  const { mutate, isPending, isSuccess, error } = useCreateLink();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return;
    mutate({ url });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
      <button type='submit'>{isPending ? '등록중...' : '등록'}</button>

      {isSuccess && <p>✅ 링크 등록 완료!</p>}
      {error && <p>❌ 링크 등록 실패 {error.message}</p>}
    </form>
  );
}
