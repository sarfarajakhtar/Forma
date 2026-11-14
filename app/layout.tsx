import "./globals.css";

export const metadata = {
  title: "Forma",
  description: "AI website generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
