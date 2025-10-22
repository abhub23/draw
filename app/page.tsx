'use client';

import { useRef, useEffect, RefObject, type MouseEvent, TouchEvent } from 'react';
import { useDrawing } from '@/store/useDrawing';
import { useColor } from '@/store/useColor';
import { useStrokeWidth } from '@/store/useStrokeWidth';
import ColorSelector from '@/components/ColorSelector';

function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef: RefObject<CanvasRenderingContext2D | null> = useRef(null);

  const { isDrawing, setIsDrawing } = useDrawing();
  const { color } = useColor();
  const { strokeWidth, setStrokeWidth } = useStrokeWidth();

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
    }
  }, [color]);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.lineWidth = strokeWidth;
    }
  }, [strokeWidth]);

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
    context.lineWidth = strokeWidth;
    contextRef.current = context;
  }, []);

  const startDrawing = (e: MouseEvent | TouchEvent) => {
    let offsetX: number, offsetY: number;
    
    if (e.nativeEvent instanceof MouseEvent) {
      ({ offsetX, offsetY } = e.nativeEvent);
    } else {
      const rect = canvasRef.current?.getBoundingClientRect();
      offsetX = e.nativeEvent.touches[0].clientX - (rect?.left || 0);
      offsetY = e.nativeEvent.touches[0].clientY - (rect?.top || 0);
    }
    
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing) {
      return;
    }
    
    let offsetX: number, offsetY: number;
    
    if (e.nativeEvent instanceof MouseEvent) {
      ({ offsetX, offsetY } = e.nativeEvent);
    } else {
      const rect = canvasRef.current?.getBoundingClientRect();
      offsetX = e.nativeEvent.touches[0].clientX - (rect?.left || 0);
      offsetY = e.nativeEvent.touches[0].clientY - (rect?.top || 0);
    }
    
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  return (
    <div className='relative h-full w-full'>
      <ColorSelector/>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
        className='absolute min-h-full min-w-full bg-white'
      ></canvas>
    </div>
  );
}

export default Home;
