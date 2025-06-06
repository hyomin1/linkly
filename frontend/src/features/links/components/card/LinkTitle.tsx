import { ExternalLink } from 'lucide-react';

export default function LinkTitle({ title }: { title: string }) {
  return (
    <h3 className='text-white text-base sm:text-lg font-bold line-clamp-2 group-hover/link:text-blue-400 transition-colors duration-200 leading-tight'>
      {title}
      <ExternalLink className='inline-block w-4 h-4 ml-1 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200' />
    </h3>
  );
}
