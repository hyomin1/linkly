import LinkInputForm from '../../features/links/components/LinkInputForm';

export default function AddLink() {
  return (
    <div className='max-w-screen-sm mx-auto p-4'>
      <h2 className='text-2xl font-bold text-white mb-4'>링크 추가</h2>
      <LinkInputForm />
    </div>
  );
}
