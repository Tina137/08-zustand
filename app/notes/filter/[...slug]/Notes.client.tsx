"use client";

import { useState } from "react";
import css from "./page.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebounce } from "use-debounce";

// Components
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [debouncedInput] = useDebounce(inputValue, 500);

  const { data } = useQuery({
    queryKey: ["notes", page, debouncedInput, tag],
    queryFn: () => fetchNotes(page, debouncedInput, tag),
    placeholderData: keepPreviousData,
  });

  const onPageChange = (selected: number) => {
    setPage(selected + 1);
  };

  const changeInput = (value: string) => {
    setPage(1);
    setInputValue(value);
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox inputValue={inputValue} changeInput={changeInput} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={page}
            setPage={onPageChange}
          />
        )}
        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </div>
      {data && data?.notes?.length >= 1 && <NoteList notes={data.notes} />}
    </div>
  );
}
