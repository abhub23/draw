import { Trash2 } from 'lucide-react';
import { useDrawing } from '@/store/useDrawing';

export default function ClearButton() {
  const { clearCanvas } = useDrawing();

  return (
    <button
      onClick={clearCanvas}
      className='flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-gray-100'
      title='Clear canvas'
    >
      <Trash2 className='h-5 w-5 text-gray-700' />
    </button>
  );
}
