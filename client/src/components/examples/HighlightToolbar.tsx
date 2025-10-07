import { useState } from "react";
import { HighlightToolbar } from "../HighlightToolbar";

export default function HighlightToolbarExample() {
  const [selectedColor, setSelectedColor] = useState<"yellow" | "green" | "blue" | "pink">("yellow");

  return (
    <div className="p-8 flex items-center justify-center">
      <HighlightToolbar
        onColorSelect={(color) => {
          setSelectedColor(color);
          console.log("Color selected:", color);
        }}
        onNoteAdd={() => console.log("Add note clicked")}
        selectedColor={selectedColor}
      />
    </div>
  );
}
