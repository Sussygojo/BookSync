import { SearchDialog } from "../SearchDialog";

export default function SearchDialogExample() {
  return (
    <div className="p-4">
      <SearchDialog
        onAddBook={(book) => console.log("Book added:", book)}
      />
    </div>
  );
}
