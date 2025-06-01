import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: Props) {
  return createPortal(
    <div
      className='fixed inset-0 bg-black/60 z-50 flex items-center justify-center'
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className='w-[90%] max-w-md'>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}
