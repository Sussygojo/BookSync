import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import { ReaderControls } from "@/components/ReaderControls";
import { HighlightToolbar } from "@/components/HighlightToolbar";
import { NoteCard, type Note } from "@/components/NoteCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Reader() {
  const [, params] = useRoute("/reader/:id");
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const bookId = params?.id || "1";
  const [totalPages] = useState(180);
  
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem(`book-${bookId}-page`);
    return saved ? parseInt(saved, 10) : 1;
  });
  
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [showHighlightToolbar, setShowHighlightToolbar] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [selectedColor, setSelectedColor] = useState<"yellow" | "green" | "blue" | "pink">("yellow");
  const [goToPageOpen, setGoToPageOpen] = useState(false);
  const [pageInput, setPageInput] = useState("");
  
  useEffect(() => {
    localStorage.setItem(`book-${bookId}-page`, currentPage.toString());
  }, [currentPage, bookId]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }
      
      if (e.key === "ArrowLeft" && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);
  
  const [notes] = useState<Note[]>([
    {
      id: "1",
      content: "This passage beautifully captures the essence of the American Dream.",
      highlightedText: "So we beat on, boats against the current, borne back ceaselessly into the past.",
      color: "yellow",
      page: 180,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      content: "The symbolism of the green light represents Gatsby's hopes and dreams.",
      color: "green",
      page: 21,
      createdAt: new Date().toISOString(),
    },
  ]);

  const fontSizeClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  };

  const book = {
    id: bookId,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  };

  const handleGoToPage = () => {
    const page = parseInt(pageInput, 10);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setGoToPageOpen(false);
      setPageInput("");
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLocation("/")}
                data-testid="button-back-to-library"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="font-serif font-semibold text-lg" data-testid="text-book-title">
                  {book.title}
                </h1>
                <p className="text-xs text-muted-foreground">{book.author}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Dialog open={goToPageOpen} onOpenChange={setGoToPageOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    data-testid="button-page-info"
                  >
                    Page {currentPage} of {totalPages}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md" data-testid="dialog-go-to-page">
                  <DialogHeader>
                    <DialogTitle>Go to Page</DialogTitle>
                    <DialogDescription>
                      Enter a page number between 1 and {totalPages}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="1"
                      max={totalPages}
                      placeholder="Page number"
                      value={pageInput}
                      onChange={(e) => setPageInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleGoToPage()}
                      data-testid="input-page-number"
                      autoFocus
                    />
                    <Button onClick={handleGoToPage} data-testid="button-go-to-page">
                      Go
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleTheme}
                data-testid="button-reader-theme-toggle"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-1 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            <div className={cn("lg:col-span-3", showNotes ? "lg:col-span-3" : "lg:col-span-4")}>
              <ScrollArea className="h-[calc(100vh-180px)]">
                <article
                  className={cn(
                    "max-w-3xl mx-auto px-6 md:px-12 lg:px-16 py-12 font-serif leading-relaxed",
                    fontSizeClasses[fontSize]
                  )}
                  data-testid="article-book-content"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">
                    {currentPage <= 20 ? "Chapter 1" : currentPage <= 50 ? "Chapter 2" : currentPage <= 100 ? "Chapter 3" : "Chapter 4"}
                  </h2>
                  
                  <p className="mb-6">
                    In my younger and more vulnerable years my father gave me some advice that I've been
                    turning over in my mind ever since.
                  </p>
                  
                  <p className="mb-6">
                    "Whenever you feel like criticizing any one," he told me, "just remember that all the
                    people in this world haven't had the advantages that you've had."
                  </p>
                  
                  <p className="mb-6">
                    He didn't say any more, but we've always been unusually communicative in a reserved
                    way, and I understood that he meant a great deal more than that. In consequence, I'm
                    inclined to reserve all judgments, a habit that has opened up many curious natures to me
                    and also made me the victim of not a few veteran bores.
                  </p>
                  
                  <p className="mb-6 bg-highlight-yellow/30 px-2 py-1 rounded">
                    The abnormal mind is quick to detect and attach itself to this quality when it appears
                    in a normal person, and so it came about that in college I was unjustly accused of being
                    a politician, because I was privy to the secret griefs of wild, unknown men.
                  </p>
                  
                  <p className="mb-6">
                    Most of the confidences were unsought—frequently I have feigned sleep, preoccupation,
                    or a hostile levity when I realized by some unmistakable sign that an intimate revelation
                    was quivering on the horizon; for the intimate revelations of young men, or at least the
                    terms in which they express them, are usually plagiaristic and marred by obvious suppressions.
                  </p>
                  
                  <p className="mb-6">
                    Reserving judgments is a matter of infinite hope. I am still a little afraid of missing
                    something if I forget that, as my father snobbishly suggested, and I snobbishly repeat,
                    a sense of the fundamental decencies is parcelled out unequally at birth.
                  </p>
                  
                  <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
                    Page {currentPage}
                  </div>
                </article>
              </ScrollArea>
              
              <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  data-testid="button-prev-page"
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  data-testid="button-next-page"
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {showNotes && (
              <div className="lg:col-span-1 border-l bg-muted/20">
                <ScrollArea className="h-[calc(100vh-180px)]">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold" data-testid="text-notes-heading">Notes & Highlights</h3>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowNotes(false)}
                        data-testid="button-close-notes"
                      >
                        Close
                      </Button>
                    </div>
                    {notes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={() => console.log("Edit note:", note.id)}
                        onDelete={() => console.log("Delete note:", note.id)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showHighlightToolbar && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2">
          <HighlightToolbar
            onColorSelect={(color) => {
              setSelectedColor(color);
              console.log("Highlight color:", color);
            }}
            onNoteAdd={() => console.log("Add note")}
            selectedColor={selectedColor}
          />
        </div>
      )}
      
      <ReaderControls
        onHighlightToggle={() => setShowHighlightToolbar(!showHighlightToolbar)}
        onNotesToggle={() => setShowNotes(!showNotes)}
        onBookmarkAdd={() => console.log("Bookmark added")}
        onFontSizeChange={setFontSize}
        currentFontSize={fontSize}
      />
    </div>
  );
}
