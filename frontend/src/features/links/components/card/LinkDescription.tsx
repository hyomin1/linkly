interface Props {
  description?: string;
}

export default function LinkDescription({ description }: Props) {
  if (!description) return null;
  return (
    <p className='text-gray-400 text-sm line-clamp-2 leading-relaxed'>
      {description}
    </p>
  );
}
