import { create } from "zustand";
import { persist } from "zustand/middleware";
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

export const useNoteDraftStore = create<UseStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
