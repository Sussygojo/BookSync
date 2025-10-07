import { Button } from "@/components/ui/button";
import {
  Highlighter,
  StickyNote,
  Bookmark,
  Type,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReaderControlsProps {
  onHighlightToggle?: () => void;
  onNotesToggle?: () => void;
  onBookmarkAdd?: () => void;
  onFontSizeChange?: (size: "sm" | "md" | "lg" | "xl") => void;
  currentFontSize?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function ReaderControls({
  onHighlightToggle,
  onNotesToggle,
  onBookmarkAdd,
  onFontSizeChange,
  currentFontSize = "md",
  className,
}: ReaderControlsProps) {
  const fontSizes = [
    { label: "Small", value: "sm" as const },
    { label: "Medium", value: "md" as const },
    { label: "Large", value: "lg" as const },
    { label: "Extra Large", value: "xl" as const },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-2 p-2 bg-popover border border-popover-border rounded-full shadow-xl backdrop-blur-md",
        className
      )}
      data-testid="controls-reader"
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={onHighlightToggle}
        data-testid="button-toggle-highlight"
        className="rounded-full"
      >
        <Highlighter className="w-4 h-4" />
      </Button>
      
      <Button
        size="icon"
        variant="ghost"
        onClick={onNotesToggle}
        data-testid="button-toggle-notes"
        className="rounded-full"
      >
        <StickyNote className="w-4 h-4" />
      </Button>
      
      <Button
        size="icon"
        variant="ghost"
        onClick={onBookmarkAdd}
        data-testid="button-add-bookmark"
        className="rounded-full"
      >
        <Bookmark className="w-4 h-4" />
      </Button>
      
      <div className="w-px h-6 bg-border" />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            data-testid="button-font-size"
            className="rounded-full"
          >
            <Type className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="top">
          {fontSizes.map((size) => (
            <DropdownMenuItem
              key={size.value}
              onClick={() => onFontSizeChange?.(size.value)}
              className={cn(
                currentFontSize === size.value && "bg-accent"
              )}
              data-testid={`menuitem-font-${size.value}`}
            >
              {size.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button
        size="icon"
        variant="ghost"
        data-testid="button-reader-settings"
        className="rounded-full"
      >
        <Settings className="w-4 h-4" />
      </Button>
    </div>
  );
}
