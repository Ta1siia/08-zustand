import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
export const PER_PAGE = 12;

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (
  page: number,
  search?: string,
  tag?: NoteTag,
): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: PER_PAGE,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
  });
  return res.data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const res = await api.post<Note>("/notes", note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};
