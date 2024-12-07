import { create } from "zustand";

interface State {
  state: boolean;
  OnChange: () => void;
}

export const SidebarStore = create<State>()((set, get) => ({
  state: false,
  OnChange: () => {
    const { state } = get();
    set({ state: !state });
  },
}));
