import { EmptyLibrary } from "../EmptyLibrary";

export default function EmptyLibraryExample() {
  return (
    <div className="min-h-screen bg-background">
      <EmptyLibrary
        onUploadClick={() => console.log("Upload clicked")}
        onSearchClick={() => console.log("Search clicked")}
      />
    </div>
  );
}
