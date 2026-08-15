import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreateNoteParams } from "@/lib/api";

type Draft = CreateNoteParams;

interface NoteStore {
  draft: Draft;
  setDraft: (note: Draft) => void;
  clearDraft: () => void;
}

const initialDraft: Draft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
      skipHydration: true,
    },
  ),
);
