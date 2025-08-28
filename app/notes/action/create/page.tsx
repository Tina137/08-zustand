import CreateNote from "@/components/CreateNote/CreateNote";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "You can create your notes here!!",
  openGraph: {
    title: "Create note",
    description: "You can create your notes here!!",
    url: `https://notehub.com/notes/action/create`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Note hub",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function CreateNotePage() {
  return <CreateNote />;
}
