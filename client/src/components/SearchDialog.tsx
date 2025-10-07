import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface SearchResult {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  description?: string;
}

interface SearchDialogProps {
  trigger?: React.ReactNode;
  onAddBook?: (book: SearchResult) => void;
}

export function SearchDialog({ trigger, onAddBook }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setResults([
      {
        id: "1",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description: "A gripping tale of racial injustice and childhood innocence.",
      },
      {
        id: "2",
        title: "1984",
        author: "George Orwell",
        description: "A dystopian social science fiction novel and cautionary tale.",
      },
      {
        id: "3",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        description: "A romantic novel of manners set in Georgian England.",
      },
    ]);
    setSearching(false);
  };

  const handleAddBook = (book: SearchResult) => {
    onAddBook?.(book);
    console.log("Adding book:", book.title);
    setOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" data-testid="button-search-books">
            <Search className="w-4 h-4" />
            Search Books
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl" data-testid="dialog-search">
        <DialogHeader>
          <DialogTitle>Search Books</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search by title, author, or ISBN..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              data-testid="input-search-query"
            />
            <Button onClick={handleSearch} disabled={searching} data-testid="button-execute-search">
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
          
          {results.length > 0 && (
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {results.map((book) => (
                  <Card
                    key={book.id}
                    className="p-4 hover-elevate transition-all"
                    data-testid={`card-search-result-${book.id}`}
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-24 bg-muted rounded flex-shrink-0 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-serif font-semibold text-sm">
                          {book.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {book.author}
                        </p>
                        {book.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {book.description}
                          </p>
                        )}
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleAddBook(book)}
                        data-testid={`button-add-book-${book.id}`}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
          
          {searching && (
            <div className="text-center py-8 text-sm text-muted-foreground">
              Searching...
            </div>
          )}
          
          {!searching && results.length === 0 && query && (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No results found. Try a different search term.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
