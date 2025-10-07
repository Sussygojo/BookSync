import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UploadDialogProps {
  trigger?: React.ReactNode;
  onUpload?: (file: File) => Promise<void>;
}

export function UploadDialog({ trigger, onUpload }: UploadDialogProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".epub"))) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    try {
      await onUpload?.(selectedFile);
      setProgress(100);
      setTimeout(() => {
        setOpen(false);
        setSelectedFile(null);
        setUploading(false);
        setProgress(0);
      }, 500);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false);
      setProgress(0);
    }
    
    clearInterval(interval);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button data-testid="button-upload-book">
            <Upload className="w-4 h-4" />
            Upload Book
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" data-testid="dialog-upload">
        <DialogHeader>
          <DialogTitle>Upload Book</DialogTitle>
          <DialogDescription>
            Upload a PDF or EPUB file to add to your library
          </DialogDescription>
        </DialogHeader>
        <div
          className={cn(
            "border-2 border-dashed rounded-md p-8 text-center transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-border",
            uploading && "pointer-events-none opacity-50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          data-testid="dropzone-upload"
        >
          {!selectedFile ? (
            <>
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your book here
              </p>
              <p className="text-xs text-muted-foreground mb-4">or</p>
              <label htmlFor="file-upload">
                <Button variant="secondary" asChild>
                  <span data-testid="button-browse-files">Browse Files</span>
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.epub"
                onChange={handleFileSelect}
                className="hidden"
                data-testid="input-file-upload"
              />
              <p className="text-xs text-muted-foreground mt-4">
                Supports PDF and EPUB formats
              </p>
            </>
          ) : (
            <div className="space-y-4">
              {progress === 100 ? (
                <CheckCircle2 className="w-12 h-12 mx-auto text-status-online" />
              ) : (
                <FileText className="w-12 h-12 mx-auto text-primary" />
              )}
              <div>
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {uploading && (
                <div className="space-y-2">
                  <Progress value={progress} data-testid="progress-upload" />
                  <p className="text-xs text-muted-foreground">{progress}% uploaded</p>
                </div>
              )}
              {!uploading && progress === 0 && (
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedFile(null)}
                    data-testid="button-cancel-upload"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpload} data-testid="button-confirm-upload">
                    Upload
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
