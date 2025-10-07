import { SyncIndicator } from "../SyncIndicator";

export default function SyncIndicatorExample() {
  return (
    <div className="flex gap-4 p-4">
      <SyncIndicator status="synced" />
      <SyncIndicator status="syncing" />
      <SyncIndicator status="offline" />
    </div>
  );
}
