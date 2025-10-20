'use client' 

import { useRef } from "react";

function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const startDrawing = () => {

  }

  const stopDrawing = () => {

  }

  const Draw = () => {

  }

  return (
    <canvas
    ref={canvasRef} 
    className="bg-white h-screen w-screen">
      
    </canvas>
  );
}

export default Home