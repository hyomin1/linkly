import Header from '../components/layout/Header';
import StatsBox from '../components/common/StatsBox';
import LoginButtons from '../components/common/LoginButton';
import { useCurrentUser } from '../features/user/hooks/useCurrentUser';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CategoryForm from '../features/categories/components/CategoryForm';
import LinkListSection from './../features/links/components/LinkListSection';
import LinkForm from '../features/links/components/form/LinkForm';
import { Folder, LinkIcon, PlusCircle } from 'lucide-react';
import CategoryList from '../features/categories/components/CategoryList';

export default function LinkPage() {
  const { data: user, isLoading } = useCurrentUser();
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <Header />
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {user ? (
          <>
            <StatsBox />
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10'>
              <div className='lg:col-span-1 space-y-10'>
                <section>
                  <h2 className='text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2'>
                    <PlusCircle className='w-4 h-4 text-blue-400' />새 카테고리
                    추가
                  </h2>
                  <CategoryForm />
                </section>

                <section>
                  <h2 className='text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2'>
                    <LinkIcon className='w-4 h-4 text-blue-400' />새 링크 추가
                  </h2>
                  <LinkForm />
                </section>

                <section>
                  <h2 className='text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2'>
                    <Folder className='w-4 h-4 text-blue-400' />
                    카테고리 목록
                  </h2>
                  <CategoryList />
                </section>
              </div>

              <div className='lg:col-span-2'>
                <LinkListSection />
              </div>
            </div>
          </>
        ) : (
          <LoginButtons />
        )}
      </div>
    </div>
  );
}
