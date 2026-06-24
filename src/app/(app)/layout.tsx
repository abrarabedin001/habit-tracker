import { BottomNav } from "@/components/nav/bottom-nav";

/**
 * App shell: a centered phone-width column with the fixed bottom nav.
 * The auth guard (redirect unauthenticated → /sign-in) lands here in Phase 1.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background">
      <main className="flex-1 pb-4">{children}</main>
      <BottomNav />
    </div>
  );
}
