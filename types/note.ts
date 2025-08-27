import { ReactNode } from "react";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface InitialValuesProps {
  title: string;
  content: string;
  tag: string;
}

export interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const tagsArr = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];
