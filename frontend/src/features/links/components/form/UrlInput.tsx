import { Globe, LinkIcon } from 'lucide-react';

interface Props {
  url: string;
  onChange: (url: string) => void;
}
export default function UrlInput({ url, onChange }: Props) {
  return (
    <div className='space-y-2'>
      <label
        htmlFor='url'
        className='flex items-center gap-2 text-sm font-semibold text-white tracking-wide'
      >
        <Globe className='w-4 h-4 text-blue-400' />
        URL
      </label>
      <div className='relative'>
        <LinkIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
        <input
          id='url'
          type='text'
          placeholder='https://example.com'
          value={url}
          onChange={(e) => onChange(e.target.value)}
          className='w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400'
        />
      </div>
    </div>
  );
}
