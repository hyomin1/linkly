import apiClient from '../../lib/apiClient';

export default function LogoutButton() {
  //const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiClient.get('/auth/logout');
      // 여기서 상태관리 전역 로그인 플래그 등 초기화 필요하면 추가
      window.location.href = '/';
    } catch {
      alert('로그아웃 실패');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className='ml-4 px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 transition'
    >
      로그아웃
    </button>
  );
}
