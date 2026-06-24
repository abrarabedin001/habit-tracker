import { BottomNav } from "@/components/nav/bottom-nav";
import { requireUserId } from "@/lib/auth-helpers";

/**
 * App shell: a centered phone-width column with the fixed bottom nav.
 * Guards the app — unauthenticated visitors are redirected to /sign-in.
 */
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUserId();

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background">
      <main className="flex-1 pb-4">{children}</main>
      <BottomNav />
    </div>
  );
}
