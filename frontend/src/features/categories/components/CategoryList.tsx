import { useGetCategories } from '../hooks/useGetCategories';
import { useDeleteCategory } from '../hooks/useDeleteCategory';
import { Trash2 } from 'lucide-react';

export default function CategoryList() {
  const { data: categories = [] } = useGetCategories();
  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  const handleDelete = (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteCategory(id);
    }
  };

  return (
    <ul className='space-y-2'>
      {categories.length === 0 ? (
        <li className='text-sm text-gray-500'>카테고리가 없습니다.</li>
      ) : (
        categories.map((cat) => (
          <li
            key={cat.id}
            className='flex items-center justify-between text-sm text-white px-3 py-2 rounded-md bg-gray-800 border border-gray-700'
          >
            <span>{cat.name}</span>
            <button
              onClick={() => handleDelete(cat.id)}
              disabled={isPending}
              className='text-gray-400 hover:text-red-400 transition'
            >
              <Trash2 className='w-4 h-4' />
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
