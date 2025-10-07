import { LibraryHeader } from "../LibraryHeader";
import { ThemeProvider } from "../ThemeProvider";

export default function LibraryHeaderExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <LibraryHeader
          onUploadClick={() => console.log("Upload clicked")}
          onSearchClick={() => console.log("Search clicked")}
          onSearchChange={(query) => console.log("Search query:", query)}
          syncStatus="synced"
        />
      </div>
    </ThemeProvider>
  );
}
