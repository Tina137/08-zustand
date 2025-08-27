import { create } from "zustand";
import { InitialValuesProps } from "@/types/note";

const initialDraft: InitialValuesProps = {
  title: "",
  content: "",
  tag: "Todo",
};

type UseStore = {
  draft: InitialValuesProps;
  setDraft: (note: InitialValuesProps) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<UseStore>()((set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}));
