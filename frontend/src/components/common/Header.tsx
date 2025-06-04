import { Bookmark } from 'lucide-react';
import LogoutButton from './LogoutButton';

export default function Header() {
  return (
    <header className='bg-gray-800 border-b border-gray-700'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
              <Bookmark className='w-5 h-5 text-white' />
            </div>
            <h1 className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
              LinkBox
            </h1>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
