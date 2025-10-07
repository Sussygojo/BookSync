import { useState } from "react";
import { ReaderControls } from "../ReaderControls";

export default function ReaderControlsExample() {
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg" | "xl">("md");

  return (
    <div className="h-screen relative bg-background">
      <ReaderControls
        onHighlightToggle={() => console.log("Highlight toggled")}
        onNotesToggle={() => console.log("Notes toggled")}
        onBookmarkAdd={() => console.log("Bookmark added")}
        onFontSizeChange={(size) => {
          setFontSize(size);
          console.log("Font size changed:", size);
        }}
        currentFontSize={fontSize}
      />
    </div>
  );
}
