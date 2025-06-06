interface Props {
  image: string;
  title: string;
}

export default function LinkThumbnail({ image, title }: Props) {
  return (
    <div className='relative overflow-hidden'>
      <img
        src={image ?? '/linkly_icon.png'}
        alt={title}
        className='w-full h-36 sm:h-48 object-cover group-hover/link:scale-105 transition-transform duration-500'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-300' />
    </div>
  );
}
