import { UploadDialog } from "../UploadDialog";

export default function UploadDialogExample() {
  return (
    <div className="p-4">
      <UploadDialog
        onUpload={async (file) => {
          console.log("Uploading file:", file.name);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }}
      />
    </div>
  );
}
