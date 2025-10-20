import { create } from 'zustand';

type Colortype = {
  color: string;
  setColor: (value: string) => void;
};

export const useColor = create<Colortype>((set) => ({
  color: 'black',
  setColor: (value: string) => set({ color: value }),
}));
