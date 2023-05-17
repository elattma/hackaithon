import { cn } from "@/lib/utils";
import "./globals.css";
import { mono, sans } from "@/lib/fonts";

export const metadata = {
  title: "PM Agent",
  description:
    "A product management agent built for Craft Venture's HackAIthon 2023 by Mimo",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-foreground",
          sans.variable,
          mono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
