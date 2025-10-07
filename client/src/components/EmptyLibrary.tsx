import { BookOpen, Upload, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyLibraryProps {
  onUploadClick?: () => void;
  onSearchClick?: () => void;
}

export function EmptyLibrary({ onUploadClick, onSearchClick }: EmptyLibraryProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10">
          <BookOpen className="w-12 h-12 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-semibold" data-testid="text-empty-title">
            Your Library is Empty
          </h2>
          <p className="text-muted-foreground">
            Start building your digital library by uploading books or discovering new titles
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onUploadClick} size="lg" data-testid="button-empty-upload">
            <Upload className="w-4 h-4" />
            Upload Book
          </Button>
          <Button
            onClick={onSearchClick}
            size="lg"
            variant="outline"
            data-testid="button-empty-search"
          >
            <Search className="w-4 h-4" />
            Search Books
          </Button>
        </div>
      </div>
    </div>
  );
}
