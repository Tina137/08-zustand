"use client";
import css from "./NoteForm.module.css";
import type { InitialValuesProps } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { postList } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const fieldId = useId();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: postList,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/All");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(
      formData
    ) as unknown as InitialValuesProps;
    mutate(values);
  };

  const handleCancel = () => router.push("/notes/filter/All");

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          defaultValue={draft?.title}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          defaultValue={draft?.content}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          onChange={handleChange}
          defaultValue={draft?.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error} />
      </div>

      <div className={css.actions}>
        <button
          onClick={handleCancel}
          type="button"
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}

// const queryClient = useQueryClient();
// const { mutate } = useMutation({
//   mutationFn: async (newList: InitialValuesProps) => await postList(newList),
//   onSuccess: () => {
//     console.log("Todo added successfully");
//     queryClient.invalidateQueries({ queryKey: ["notes"] });
//   },
// });
// const handleSubmit = (
//   values: InitialValuesProps,
//   actions: FormikHelpers<InitialValuesProps>
// ) => {
//   mutate(values);
//   console.log("Order data:", values);
//   actions.resetForm();
// };
// const OrderFormSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Title must be at least 3 characters")
//     .max(50, "Title is too long")
//     .required("Title is required"),
//   content: Yup.string().max(500, "Content is too long"),
//   tag: Yup.string()
//     .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
//     .required(),
// });
