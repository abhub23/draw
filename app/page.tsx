'use client';

import { useRef, useEffect } from 'react';

function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas?.width = window.innerWidth * 2;
    canvas?.height = window.innerHeight;
  }, []);

  const startDrawing = () => {};

  const stopDrawing = () => {};

  const Draw = () => {};

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={Draw}
      className='h-screen w-screen bg-white'
    ></canvas>
  );
}

export default Home;
