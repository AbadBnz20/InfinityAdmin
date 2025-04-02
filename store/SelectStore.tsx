import { create } from "zustand";

interface State {
  idCountry: string;
  setCountry: (id: string) => void;
  idState: string;
  setState: (id: string) => void;
}




export const SelectStore = create<State>((set) => ({
    idCountry: "",
    setCountry: (id) => set(() => ({ idCountry: id })),
    idState: "",
    setState: (id) => set(() => ({ idState: id })),
}))