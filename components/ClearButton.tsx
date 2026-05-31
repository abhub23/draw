import { useDrawing } from '@/store/useDrawing';
import { Button } from '@/components/ui/button';

export default function ClearButton() {
  const { clearCanvas } = useDrawing();

  return (
    <Button
      onClick={clearCanvas}
      variant='destructive'
      size='sm'
      className='cursor-pointer text-base'
    >
      Reset
    </Button>
  );
}
