import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { isNoteTag } from "@/types/note";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rawTag = slug[0];
  const label = isNoteTag(rawTag) ? rawTag : "All notes";

  const title = `Notes: ${label} | NoteHub`;
  const description =
    label === "All notes"
      ? "Browse all notes in NoteHub."
      : `Browse notes filtered by the ${label} category in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-three-ashen.vercel.app/notes/filter/${slug.join("/")}`,
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
}
export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const rawTag = slug[0];
  const tag = isNoteTag(rawTag) ? rawTag : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1, tag }],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
