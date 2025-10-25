import { create } from 'zustand';

type DrawType = {
  // states
  isDrawing: boolean;
  color: string;
  strokeWidth: number;

  // state updating methods
  setIsDrawing: (value: boolean) => void;
  setColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
};

export const useDrawing = create<DrawType>((set) => ({
  isDrawing: false,
  strokeWidth: 3,
  color: '#000000',

  setIsDrawing: (value: boolean) => set({ isDrawing: value }),
  setStrokeWidth: (value: number) => set({ strokeWidth: value }),
  setColor: (value: string) => set({ color: value }),
}));
