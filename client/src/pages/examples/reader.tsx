import Reader from "../reader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function ReaderExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Reader />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
