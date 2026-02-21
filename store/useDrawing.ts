import { create } from 'zustand';

type DrawType = {
  // states
  isDrawing: boolean;
  color: string;
  strokeWidth: number;
  clearTimestamp: number;

  // state updating methods
  setIsDrawing: (value: boolean) => void;
  setColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
  clearCanvas: () => void;
};

export const useDrawing = create<DrawType>((set) => ({
  isDrawing: false,
  strokeWidth: 3,
  color: '#000000',
  clearTimestamp: 0,

  setIsDrawing: (value: boolean) => set({ isDrawing: value }),
  setStrokeWidth: (value: number) => set({ strokeWidth: value }),
  setColor: (value: string) => set({ color: value }),
  clearCanvas: () => set((state) => ({ isDrawing: false, clearTimestamp: state.clearTimestamp + 1 })),
}));
