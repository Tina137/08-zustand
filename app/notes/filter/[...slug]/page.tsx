import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Category: ${slug[0]}`,
    description: "Here you can see your notes",
    openGraph: {
      title: `Category: ${slug[0]}`,
      description: "Here you can see your notes",
      url: `https://notehub.com/notes/filter/${slug[0]}`,
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
  return <NotesClient tag={slug[0]} />;
}
