import AddLink from './links/Add';
import LinkListView from './links/LinkListView';
import Header from '../components/common/Header';
import StatsBox from '../components/common/StatsBox';
import LoginButtons from '../components/common/LoginButton';
import { useCurrentUser } from '../features/user/hooks/useCurrentUser';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Home() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <Header />
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {user ? (
          <>
            <StatsBox />
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8'>
              <div className='lg:col-span-1'>
                <AddLink />
              </div>
              <div className='lg:col-span-2'>
                <LinkListView />
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
