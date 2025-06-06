import { Globe } from 'lucide-react';
import { getDomain } from '../../utils/extractDomain';

interface Props {
  siteName: string;
  url: string;
}

export default function LinkMeta({ siteName, url }: Props) {
  if (siteName) {
    <span className='inline-block text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded-full text-xs font-medium max-w-[70%] truncate'>
      {siteName}
    </span>;
  }
  return (
    <div className='flex items-center gap-1 text-xs text-gray-400'>
      <Globe className='w-3 h-3' />
      <span className='truncate'>{getDomain(url)}</span>
    </div>
  );
}
