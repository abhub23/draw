import { Slider } from './ui/slider';
import { useDrawing } from '@/store/useDrawing';

function StrokeWidthSelector() {
  const { strokeWidth, setStrokeWidth, color } = useDrawing();

  return (
    <Slider
      color={color}
      className='w-50'
      min={1}
      max={30}
      value={[strokeWidth]}
      onValueChange={(values) => {
        if (Array.isArray(values) && values.length > 0 && typeof values[0] === 'number') {
          setStrokeWidth(values[0]);
        }
      }}
    />
  );
}

export default StrokeWidthSelector;
