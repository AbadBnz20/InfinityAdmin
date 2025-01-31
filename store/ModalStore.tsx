import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  idItem: string | null;
  onOpen: () => void;
  onClose: () =>  void;
  onOpenChange: (open: boolean) => void;
  onChanseItem: (id: string | null)=>void,

}
export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  idItem: null,
  onOpen: () => {
    set({ isOpen: true })
  },
  onClose: () => set({ isOpen: false, idItem: null}),
  onChanseItem: (id)=>{
    set({idItem:id});
  },
  onOpenChange: (open: boolean) => set({ isOpen: open }),
}));
