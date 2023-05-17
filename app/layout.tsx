import "./globals.css";

export const metadata = {
  title: "PM Agent",
  description:
    "A product management agent built for Craft Venture's HackAIthon 2023 by Mimo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
