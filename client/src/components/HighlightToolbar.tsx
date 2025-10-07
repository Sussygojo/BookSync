import { Button } from "@/components/ui/button";
import { StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";

type HighlightColor = "yellow" | "green" | "blue" | "pink";

interface HighlightToolbarProps {
  onColorSelect: (color: HighlightColor) => void;
  onNoteAdd: () => void;
  selectedColor?: HighlightColor;
  className?: string;
}

export function HighlightToolbar({
  onColorSelect,
  onNoteAdd,
  selectedColor,
  className,
}: HighlightToolbarProps) {
  const colors: { name: HighlightColor; class: string }[] = [
    { name: "yellow", class: "bg-highlight-yellow" },
    { name: "green", class: "bg-highlight-green" },
    { name: "blue", class: "bg-highlight-blue" },
    { name: "pink", class: "bg-highlight-pink" },
  ];

  return (
    <div
      className={cn(
        "flex items-center gap-1 p-1 bg-popover border border-popover-border rounded-md shadow-lg",
        className
      )}
      data-testid="toolbar-highlight"
    >
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => onColorSelect(color.name)}
          className={cn(
            "w-8 h-8 rounded-md border-2 transition-all hover-elevate",
            color.class,
            selectedColor === color.name
              ? "border-foreground scale-110"
              : "border-transparent"
          )}
          data-testid={`button-highlight-${color.name}`}
          aria-label={`Highlight ${color.name}`}
        />
      ))}
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        size="icon"
        variant="ghost"
        onClick={onNoteAdd}
        data-testid="button-add-note"
        aria-label="Add note"
      >
        <StickyNote className="w-4 h-4" />
      </Button>
    </div>
  );
}
