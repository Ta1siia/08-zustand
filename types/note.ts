export const TAGS = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;

export type NoteTag = (typeof TAGS)[number];

export const isNoteTag = (value: string): value is NoteTag =>
  (TAGS as readonly string[]).includes(value);

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}
