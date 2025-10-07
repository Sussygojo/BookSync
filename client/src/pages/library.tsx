import { useState } from "react";
import { LibraryHeader } from "@/components/LibraryHeader";
import { BookCard, type Book } from "@/components/BookCard";
import { EmptyLibrary } from "@/components/EmptyLibrary";
import { UploadDialog } from "@/components/UploadDialog";
import { SearchDialog } from "@/components/SearchDialog";
import { useLocation } from "wouter";

export default function Library() {
  const [, setLocation] = useLocation();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const [books] = useState<Book[]>([
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      progress: 45,
      totalPages: 180,
      currentPage: 81,
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      progress: 72,
      totalPages: 324,
      currentPage: 233,
    },
    {
      id: "3",
      title: "1984",
      author: "George Orwell",
      progress: 28,
      totalPages: 328,
      currentPage: 92,
    },
    {
      id: "4",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      progress: 100,
      totalPages: 432,
      currentPage: 432,
    },
    {
      id: "5",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      progress: 15,
      totalPages: 277,
      currentPage: 42,
    },
    {
      id: "6",
      title: "Brave New World",
      author: "Aldous Huxley",
      progress: 0,
      totalPages: 268,
      currentPage: 0,
    },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <LibraryHeader
        onUploadClick={() => setUploadOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
        syncStatus="synced"
      />
      
      <main className="container mx-auto px-6 py-8">
        {books.length === 0 ? (
          <EmptyLibrary
            onUploadClick={() => setUploadOpen(true)}
            onSearchClick={() => setSearchOpen(true)}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-semibold" data-testid="text-library-heading">
                  My Library
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {books.length} {books.length === 1 ? "book" : "books"}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onClick={() => setLocation(`/reader/${book.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      
      <UploadDialog
        trigger={
          <button style={{ display: "none" }} data-trigger="upload" onClick={() => setUploadOpen(true)} />
        }
        onUpload={async (file) => {
          console.log("Uploading:", file.name);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }}
      />
      
      <SearchDialog
        trigger={
          <button style={{ display: "none" }} data-trigger="search" onClick={() => setSearchOpen(true)} />
        }
        onAddBook={(book) => console.log("Adding book:", book.title)}
      />
    </div>
  );
}
