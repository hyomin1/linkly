export default function LoginButtons() {
  //const navigate = useNavigate();
  return (
    <div className='text-center space-y-3'>
      <button
        onClick={() =>
          (window.location.href = 'http://localhost:3000/api/auth/google')
        }
        className='bg-white text-black font-medium px-4 py-2 rounded flex items-center gap-2 justify-center w-60 mx-auto'
      >
        <img src='/google-icon.svg' className='w-5 h-5' />
        구글로 로그인
      </button>
      <button
        onClick={() =>
          (window.location.href = 'http://localhost:3000/api/auth/kakao')
        }
        className='bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded flex items-center gap-2 justify-center w-60 mx-auto'
      >
        <img src='/kakao-icon.svg' className='w-5 h-5' />
        카카오로 로그인
      </button>
    </div>
  );
}
