import { create } from 'zustand';

type ConfirmModalState = {
  dashboardTitle: string;
  color: '#ae2e24' | '#9f4b00' | '#bd8c00' | '#206e4e' | '#1458bc';

  setTitle: (title: string) => void;
  setColor: (color: ConfirmModalState['color']) => void;
};

export const useConfirmModalStore = create<ConfirmModalState>((set) => ({
  dashboardTitle: '',
  color: '#ae2e24',

  setTitle: (dashboardTitle: string) => set({ dashboardTitle }),
  setColor: (color: ConfirmModalState['color']) => set({ color }),
}));
