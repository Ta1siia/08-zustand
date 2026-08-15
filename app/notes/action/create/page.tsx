import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description: "Create a new note in NoteHub: add a title, content and a tag.",
  openGraph: {
    title: "Create note | NoteHub",
    description:
      "Create a new note in NoteHub: add a title, content and a tag.",
    url: "https://08-zustand-three-ashen.vercel.app/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub application preview",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
