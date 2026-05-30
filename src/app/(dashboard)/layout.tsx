import { Topbar } from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background pb-[72px] md:pb-0">
      <Topbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
