import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  progress: number;
  totalPages: number;
  currentPage: number;
}

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate cursor-pointer transition-all"
      onClick={onClick}
      data-testid={`card-book-${book.id}`}
    >
      <div className="aspect-[2/3] bg-muted relative overflow-hidden">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <BookOpen className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-serif font-semibold text-base line-clamp-2" data-testid={`text-book-title-${book.id}`}>
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1" data-testid={`text-book-author-${book.id}`}>
          {book.author}
        </p>
        <div className="space-y-1">
          <Progress value={book.progress} className="h-1" data-testid={`progress-book-${book.id}`} />
          <p className="text-xs text-muted-foreground">
            {book.progress}% • {book.currentPage} / {book.totalPages} pages
          </p>
        </div>
      </div>
    </Card>
  );
}
