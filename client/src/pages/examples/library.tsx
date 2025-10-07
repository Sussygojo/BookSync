import Library from "../library";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function LibraryExample() {
  return (
    <ThemeProvider>
      <Library />
    </ThemeProvider>
  );
}
