interface Props {
  value: string;
  onChange: (value: string) => void;
}
export default function SearchInput({ value, onChange }: Props) {
  return (
    <input
      type='text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder='🔍 제목 또는 사이트명 검색'
      className='w-full px-5 py-3 text-base bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
    />
  );
}
