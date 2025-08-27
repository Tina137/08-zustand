"use client";

import { useState } from "react";
import css from "./page.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebounce } from "use-debounce";

// Components
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
// import { Modal } from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
// import NoteForm from "@/components/NoteForm/NoteForm";
import Link from "next/link";

interface NotesClientProps {
  initialData: Awaited<ReturnType<typeof fetchNotes>>;
  initialPage: number;
  initialQuery: string;
  tag: string;
}

export default function NotesClient({
  initialData,
  initialPage,
  initialQuery,
  tag,
}: NotesClientProps) {
  const [page, setPage] = useState(initialPage);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [debouncedInput] = useDebounce(inputValue, 500);

  const { data } = useQuery({
    queryKey: ["notes", page, debouncedInput, tag],
    queryFn: () => fetchNotes(page, debouncedInput, tag),
    placeholderData: keepPreviousData,
    initialData,
  });

  const onPageChange = (selected: number) => {
    setPage(selected + 1);
  };

  // const modalOpen = () => setIsModalOpen(true);
  // const modalClose = () => setIsModalOpen(false);

  const changeInput = (value: string) => {
    setPage(1);
    setInputValue(value);
  };
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox inputValue={inputValue} changeInput={changeInput} />
        {data.totalPages > 1 && (
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
      {data.notes.length >= 1 && <NoteList notes={data?.notes} />}
      {/* {isModalOpen && (
        <Modal onClose={modalClose}>
          <NoteForm onClose={modalClose} />
        </Modal>
      )} */}
    </div>
  );
}
