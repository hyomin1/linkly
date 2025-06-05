import { Globe } from 'lucide-react';
import { getDomain } from '../utils/extractDomain';
interface Props {
  siteName?: string;
  url: string;
}

export default function LinkDomain({ siteName, url }: Props) {
  if (!siteName) return null;
  return (
    <div className='flex items-center gap-1 text-xs text-gray-500'>
      <Globe className='w-3 h-3' />
      <span className='truncate'>{getDomain(url)}</span>
    </div>
  );
}
