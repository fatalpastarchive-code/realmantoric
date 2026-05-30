import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mantoric | Premium Workspace",
  description: "A minimalist sanctuary for high-performance discipline.",
};

import { DeepWorkProvider } from "@/context/DeepWorkContext";
import { DeepWorkOverlay } from "@/components/widgets/DeepWorkOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="dark">
        <head>
          <script dangerouslySetInnerHTML={{ __html: `
            (function() {
              try {
                var theme = localStorage.getItem("mantoric-theme") || "default";
                var themes = {
                  default: { primary: "#10B981", primaryFg: "#0A0A0A" },
                  emerald: { primary: "#5EA878", primaryFg: "#090E0B" },
                  steel: { primary: "#7A93B0", primaryFg: "#121417" },
                  void: { primary: "#D4D4D8", primaryFg: "#050505" }
                };
                var t = themes[theme] || themes.default;
                document.documentElement.style.setProperty("--primary", t.primary);
                document.documentElement.style.setProperty("--primary-foreground", t.primaryFg);
                document.documentElement.style.setProperty("--ring", t.primary);
                document.documentElement.setAttribute("data-theme", theme);
              } catch (e) {}
            })();
          ` }} />
        </head>
        <body
          className={cn(
            inter.variable,
            "min-h-screen bg-background font-inter antialiased text-white selection:bg-white selection:text-black"
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
          >
            <DeepWorkProvider>
              <DeepWorkOverlay />
              {children}
            </DeepWorkProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
