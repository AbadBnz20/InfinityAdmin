"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
interface Props {
  children: React.ReactNode;
}
export const Provider = ({ children }: Props) => {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => setMounted(true), []);

  // if (!mounted) return null;
  return (
    <NextUIProvider>
      <NextThemesProvider  attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
};
