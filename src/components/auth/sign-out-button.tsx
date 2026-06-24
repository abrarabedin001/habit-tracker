"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

/** Signs the user out, then sends them to the sign-in screen. */
export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      aria-label="Sign out"
      className="flex size-10 items-center justify-center rounded-full border border-border bg-card transition active:scale-95"
    >
      <LogOut className="size-5" />
    </button>
  );
}
