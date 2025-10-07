import { NoteCard } from "../NoteCard";

export default function NoteCardExample() {
  const sampleNote = {
    id: "1",
    content: "This passage beautifully captures the essence of the American Dream and its disillusionment.",
    highlightedText: "So we beat on, boats against the current, borne back ceaselessly into the past.",
    color: "yellow" as const,
    page: 180,
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="max-w-md p-4">
      <NoteCard
        note={sampleNote}
        onEdit={() => console.log("Edit note")}
        onDelete={() => console.log("Delete note")}
      />
    </div>
  );
}
