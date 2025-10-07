import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, Plus, Moon, Sun, Settings } from "lucide-react";
import { SyncIndicator } from "./SyncIndicator";
import { useTheme } from "./ThemeProvider";
import { useLocation } from "wouter";

interface LibraryHeaderProps {
  onUploadClick?: () => void;
  onSearchClick?: () => void;
  onSearchChange?: (query: string) => void;
  syncStatus?: "synced" | "syncing" | "offline";
}

export function LibraryHeader({
  onUploadClick,
  onSearchClick,
  onSearchChange,
  syncStatus = "synced",
}: LibraryHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl font-bold" data-testid="text-app-title">
              BookSync
            </h1>
          </div>
          
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search your library..."
                className="pl-10"
                onChange={(e) => onSearchChange?.(e.target.value)}
                data-testid="input-search-library"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <SyncIndicator status={syncStatus} />
            
            <Button
              variant="outline"
              onClick={onSearchClick}
              data-testid="button-search-api"
            >
              <Search className="w-4 h-4" />
              Find Books
            </Button>
            
            <Button onClick={onUploadClick} data-testid="button-upload">
              <Upload className="w-4 h-4" />
              Upload
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setLocation("/settings")}
              data-testid="button-settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
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
  );
}
