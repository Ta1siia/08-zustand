import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { isNoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
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
