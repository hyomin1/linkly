import { useState } from 'react';
import { useCreateCategory } from '../hooks/useCreateCategory';

export default function CategoryForm() {
  const [name, setName] = useState('');
  const { mutate, isPending } = useCreateCategory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    mutate({ name }, { onSuccess: () => setName('') });
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='카테고리명 입력'
        className='flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
      />
      <button
        type='submit'
        className='px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={isPending}
      >
        추가
      </button>
    </form>
  );
}
