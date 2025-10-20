'use client';

import { useRef, useEffect, RefObject, type MouseEvent } from 'react';
import { useDrawing } from '@/store/useDrawing';
import { useColor } from '@/store/useColor';

function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef: RefObject<CanvasRenderingContext2D | null> = useRef(null);

  const { isDrawing, setIsDrawing } = useDrawing();
  const { color, setColor } = useColor();

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
    }
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    if (!context) return;

    context?.scale(2, 2);
    context.lineCap = 'round';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = (e: MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = (e: MouseEvent) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  return (
    <div className='relative min-h-full min-w-full'>
      <button className='h-12 w-20 bg-red-400' onClick={() => setColor('red')}></button>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        className='absolute h-full w-full bg-white'
      ></canvas>
    </div>
  );
}

export default Home;
