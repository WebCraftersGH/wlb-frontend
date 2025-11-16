interface IPetalNotePageProps {
  params: {
    slug: string;
  };
}

export default async function PetalNotePage({ params }: IPetalNotePageProps) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}
