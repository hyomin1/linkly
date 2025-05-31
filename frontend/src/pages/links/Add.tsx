import LinkInputForm from '../../features/links/components/LinkInputForm';

export default function AddLink() {
  return (
    <div className='p-6 space-y-6 max-w-xl mx-auto'>
      <h2 className='text-2xl font-bold'>링크 등록</h2>
      <LinkInputForm />
    </div>
  );
}
