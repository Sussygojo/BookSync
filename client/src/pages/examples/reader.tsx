import Reader from "../reader";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function ReaderExample() {
  return (
    <ThemeProvider>
      <Reader />
    </ThemeProvider>
  );
}
