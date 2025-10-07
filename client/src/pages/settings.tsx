import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, FileText, Highlighter, StickyNote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/ThemeProvider";

export default function Settings() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [autoSync, setAutoSync] = useState(true);
  const [defaultFontSize, setDefaultFontSize] = useState("md");

  const stats = {
    totalBooks: 6,
    booksRead: 4,
    currentlyReading: 2,
    totalPages: 1809,
    highlights: 23,
    notes: 15,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              data-testid="button-back-to-library"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="font-serif text-2xl font-semibold" data-testid="text-settings-title">
              Settings
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account" data-testid="tab-account">
              Account
            </TabsTrigger>
            <TabsTrigger value="reading" data-testid="tab-reading">
              Reading
            </TabsTrigger>
            <TabsTrigger value="sync" data-testid="tab-sync">
              Sync & Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4" data-testid="text-stats-heading">
                Reading Statistics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-md">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" data-testid="text-total-books">
                        {stats.totalBooks}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Books</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-status-online/10 rounded-md">
                      <BookOpen className="w-6 h-6 text-status-online" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" data-testid="text-books-read">
                        {stats.booksRead}
                      </p>
                      <p className="text-sm text-muted-foreground">Books Read</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-md">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" data-testid="text-total-pages">
                        {stats.totalPages.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Pages Read</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-highlight-yellow/20 rounded-md">
                      <Highlighter className="w-6 h-6 text-highlight-yellow" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" data-testid="text-total-highlights">
                        {stats.highlights}
                      </p>
                      <p className="text-sm text-muted-foreground">Highlights</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-md">
                      <StickyNote className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" data-testid="text-total-notes">
                        {stats.notes}
                      </p>
                      <p className="text-sm text-muted-foreground">Notes</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-status-away/10 rounded-md">
                      <BookOpen className="w-6 h-6 text-status-away" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" data-testid="text-currently-reading">
                        {stats.currentlyReading}
                      </p>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <Card className="p-6 space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <p className="text-base" data-testid="text-user-email">
                    user@example.com
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Member Since</Label>
                  <p className="text-base" data-testid="text-member-since">
                    January 2024
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reading" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Reading Preferences</h2>
              <Card className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base" data-testid="label-theme">
                      Dark Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Use dark theme for comfortable reading
                    </p>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={toggleTheme}
                    data-testid="switch-dark-mode"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-base" data-testid="label-default-font">
                    Default Font Size
                  </Label>
                  <Select value={defaultFontSize} onValueChange={setDefaultFontSize}>
                    <SelectTrigger data-testid="select-font-size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    This will be your default font size when opening books
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sync" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Sync Settings</h2>
              <Card className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base" data-testid="label-auto-sync">
                      Automatic Sync
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync your books, highlights, and notes across devices
                    </p>
                  </div>
                  <Switch
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                    data-testid="switch-auto-sync"
                  />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Sync Status</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-status-online" />
                    <span data-testid="text-sync-status">Last synced: Just now</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => console.log("Manual sync triggered")}
                    data-testid="button-manual-sync"
                  >
                    Sync Now
                  </Button>
                </div>
              </Card>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Data Management</h2>
              <Card className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Export or delete your data
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => console.log("Export data")}
                      data-testid="button-export-data"
                    >
                      Export Data
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => console.log("Delete account")}
                      data-testid="button-delete-account"
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
