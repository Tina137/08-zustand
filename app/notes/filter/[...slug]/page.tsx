import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `Category: ${slug[0]}`,
    description: "Here you can see your notes",
    openGraph: {
      title: `Category: ${slug[0]}`,
      description: "Here you can see your notes",
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
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const initialData = await fetchNotes(1, "", slug[0]);
  return (
    <NotesClient
      initialData={initialData}
      initialPage={1}
      initialQuery=""
      tag={slug[0]}
    />
  );
}
