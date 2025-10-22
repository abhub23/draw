import Github from '@uiw/react-color-github';
import { useColor } from '@/store/useColor';

export default function ColorSelector() {
  const {color, setColor} = useColor();
  return (
    <div className='absolute z-10'>
      <Github
      className='lg:min-w-[240px] gap-1'
        color={color}
        showTriangle={true}
        onChange={(color) => {
          setColor(color.hex);
        }}
      />
    </div>
  );
}