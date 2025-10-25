import Github from '@uiw/react-color-github';
import { useDrawing } from '@/store/useDrawing';

export default function ColorSelector() {
  const { color, setColor } = useDrawing();
  return (
    <div className='absolute z-10'>
      <Github
        className='gap-1 lg:min-w-[240px]'
        color={color}
        showTriangle={true}
        onChange={(color) => {
          setColor(color.hex);
        }}
      />
    </div>
  );
}
