import { create } from 'zustand';

type Stroketype = {
  strokeWidth: number;
  setStrokeWidth: (value: number) => void;
};

export const useStrokeWidth = create<Stroketype>((set) => ({
  strokeWidth: 3,
  setStrokeWidth: (value: number) => set({ strokeWidth: value }),
}));
