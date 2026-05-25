import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowDesk AI | AI Employee for Business Automation",
  description:
    "FlowDesk AI is an AI-powered business support and workflow automation platform for modern teams."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
