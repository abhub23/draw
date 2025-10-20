import { create } from 'zustand';

type Drawtype = {
    isDrawing: boolean,
    setIsDrawing: (value: boolean) => void
}

export const useDrawing = create<Drawtype>((set) => ({
    isDrawing: false,
    setIsDrawing: (value: boolean) => set({isDrawing: value})
}))