'use client';

import { useRef, useEffect, RefObject, type MouseEvent, TouchEvent } from 'react';
import { useDrawing } from '@/store/useDrawing';
import ColorSelector from '@/components/ColorSelector';
import StrokeWidthSelector from '@/components/StrokeWidthSelector';
import ClearButton from '@/components/ClearButton';

function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const { isDrawing, setIsDrawing, color, strokeWidth, clearTimestamp } = useDrawing();

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
    context.lineJoin = 'round';
    context.lineWidth = 3;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current || clearTimestamp === 0) return;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  }, [clearTimestamp]);

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
    lastPointRef.current = { x: offsetX, y: offsetY };
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    lastPointRef.current = null;
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

    if (lastPointRef.current && contextRef.current) {
      const lastPoint = lastPointRef.current;
      const midPoint = {
        x: lastPoint.x + (offsetX - lastPoint.x) / 2,
        y: lastPoint.y + (offsetY - lastPoint.y) / 2,
      };

      contextRef.current.quadraticCurveTo(lastPoint.x, lastPoint.y, midPoint.x, midPoint.y);
      contextRef.current.stroke();
      contextRef.current.beginPath();
      contextRef.current.moveTo(midPoint.x, midPoint.y);

      lastPointRef.current = { x: offsetX, y: offsetY };
    }
  };

  return (
    <div className='relative h-full w-full'>
      <div className='absolute top-0 left-1/2 z-10 flex -translate-x-1/2 transform items-center gap-4 py-4'>
        <StrokeWidthSelector />
        <ColorSelector />
      </div>
      <div className='absolute top-1 right-0 z-10 p-4'>
        <ClearButton />
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
        className='absolute min-h-full min-w-full bg-white bg-grid-slate-200/[0.2]'
        style={{ cursor: 'crosshair', backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)' }}
      ></canvas>
    </div>
  );
}

export default Home;
