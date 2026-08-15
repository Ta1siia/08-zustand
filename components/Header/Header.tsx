import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Link aria-label="Home" href="/">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
