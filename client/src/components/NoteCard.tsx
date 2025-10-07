import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Note {
  id: string;
  content: string;
  highlightedText?: string;
  color?: "yellow" | "green" | "blue" | "pink";
  page: number;
  createdAt: string;
}

interface NoteCardProps {
  note: Note;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const colorClasses = {
    yellow: "bg-highlight-yellow/20 border-highlight-yellow/30",
    green: "bg-highlight-green/20 border-highlight-green/30",
    blue: "bg-highlight-blue/20 border-highlight-blue/30",
    pink: "bg-highlight-pink/20 border-highlight-pink/30",
  };

  return (
    <Card
      className="p-4 space-y-3 hover-elevate transition-all"
      data-testid={`card-note-${note.id}`}
    >
      {note.highlightedText && (
        <div
          className={`p-2 rounded text-sm italic border ${note.color ? colorClasses[note.color] : "bg-muted"}`}
        >
          "{note.highlightedText}"
        </div>
      )}
      <p className="text-sm leading-relaxed" data-testid={`text-note-content-${note.id}`}>
        {note.content}
      </p>
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            Page {note.page}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex gap-1">
          {onEdit && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onEdit}
              data-testid={`button-edit-note-${note.id}`}
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onDelete}
              data-testid={`button-delete-note-${note.id}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
