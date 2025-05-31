import { ExternalLink, Globe } from 'lucide-react';

interface Props {
  title: string;
  url: string;
}

export default function LinkCard({ title, url }: Props) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };
  return (
    <li className='bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 hover:shadow-lg transition-all duration-200 group'>
      <div className='flex items-start justify-between'>
        <div className='flex-1 min-w-0'>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='block group-hover:text-blue-400 transition-colors'
          >
            <h3 className='text-white text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors'>
              {title}
            </h3>
          </a>
          <div className='flex items-center space-x-2 text-gray-400 text-sm'>
            <Globe className='w-4 h-4' />
            <span className='truncate'>{getDomain(url)}</span>
          </div>
        </div>
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='flex-shrink-0 ml-4 p-2 rounded-lg bg-gray-700 hover:bg-blue-600 text-gray-400 hover:text-white transition-all duration-200'
        >
          <ExternalLink className='w-4 h-4' />
        </a>
      </div>
    </li>
  );
}
