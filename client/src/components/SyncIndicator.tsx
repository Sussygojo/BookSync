import { Badge } from "@/components/ui/badge";
import { Cloud, CloudOff, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SyncStatus = "synced" | "syncing" | "offline";

interface SyncIndicatorProps {
  status: SyncStatus;
  className?: string;
}

export function SyncIndicator({ status, className }: SyncIndicatorProps) {
  const icons = {
    synced: <Check className="w-3 h-3" />,
    syncing: <Loader2 className="w-3 h-3 animate-spin" />,
    offline: <CloudOff className="w-3 h-3" />,
  };

  const labels = {
    synced: "Synced",
    syncing: "Syncing...",
    offline: "Offline",
  };

  const variants = {
    synced: "bg-status-online/10 text-status-online border-status-online/20",
    syncing: "bg-primary/10 text-primary border-primary/20",
    offline: "bg-status-offline/10 text-status-offline border-status-offline/20",
  };

  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 border", variants[status], className)}
      data-testid="badge-sync-status"
    >
      {icons[status]}
      <span className="text-xs font-medium">{labels[status]}</span>
    </Badge>
  );
}
