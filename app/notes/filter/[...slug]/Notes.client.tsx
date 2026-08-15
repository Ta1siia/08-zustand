"use client";

import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Notes.module.css";

function NotesClient({ tag }: { tag?: NoteTag }) {
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    setPage(1);
  }, [tag]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { search: debouncedSearch, page, tag }],
    queryFn: () => fetchNotes(page, debouncedSearch, tag),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 400);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Could not fetch the list of notes.</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default NotesClient;
