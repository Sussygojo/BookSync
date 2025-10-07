import { BookCard } from "../BookCard";

export default function BookCardExample() {
  const sampleBook = {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    progress: 45,
    totalPages: 180,
    currentPage: 81,
  };

  return (
    <div className="w-64">
      <BookCard book={sampleBook} onClick={() => console.log("Book clicked")} />
    </div>
  );
}
