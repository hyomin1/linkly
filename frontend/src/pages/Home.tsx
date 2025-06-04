import { useEffect, useState } from 'react';
import AddLink from './links/Add';
import LinkListView from './links/LinkListView';
import Header from '../components/common/Header';
import StatsBox from '../components/common/StatsBox';
import apiClient from '../lib/apiClient';

export default function Home() {
  const [user, setUser] = useState<null | { id: number; email: string }>(null);
  const [loading, setLoading] = useState(true);
  const getCurrentUser = async () => {
    try {
      const res = await apiClient.get('/user/me');
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null); // 인증 실패 (401)
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className='text-white text-center py-20'>로딩 중...</div>;

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
          <div className='text-center'>
            <p className='text-lg mb-4'>로그인이 필요합니다.</p>
            <button
              onClick={() =>
                (window.location.href = 'http://localhost:3000/api/auth/google')
              }
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
            >
              구글로 로그인
            </button>
            <button
              onClick={() =>
                (window.location.href = 'http://localhost:3000/api/auth/kakao')
              }
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
            >
              카카오로 로그인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
