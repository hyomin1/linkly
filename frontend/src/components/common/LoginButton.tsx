export default function LoginButtons() {
  return (
    <div className='text-center space-y-3'>
      <button
        onClick={() =>
          (window.location.href = import.meta.env.VITE_GOOGLE_REDIRECT_URI)
        }
        className='w-60 h-[48px] mx-auto block rounded overflow-hidden hover:brightness-95 transition bg-white'
      >
        <img
          src='/google-login.png'
          alt='Sign in with Google'
          className='w-full h-full object-contain'
        />
      </button>

      <button
        onClick={() =>
          (window.location.href = import.meta.env.VITE_KAKAO_REDIRECT_URI)
        }
        className='w-60 h-[48px] mx-auto block rounded overflow-hidden hover:brightness-95 transition bg-[#FEE500]'
      >
        <img
          src='/kakao-login.png'
          alt='카카오 로그인'
          className='w-full h-full object-contain'
        />
      </button>
    </div>
  );
}
