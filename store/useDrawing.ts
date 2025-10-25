import { create } from 'zustand';

type Drawtype = {
  isDrawing: boolean;
  color: string;
  strokeWidth: number;

  setIsDrawing: (value: boolean) => void;
  setColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
};

export const useDrawing = create<Drawtype>((set) => ({
  isDrawing: false,
  strokeWidth: 3,
  color: '#000000',
  
  setIsDrawing: (value: boolean) => set({ isDrawing: value }),
  setStrokeWidth: (value: number) => set({ strokeWidth: value }),
  setColor: (value: string) => set({ color: value }),
}));
