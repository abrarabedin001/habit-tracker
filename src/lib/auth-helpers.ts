import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/** Current session, or null. Server-only. */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** Current user id, redirecting to /sign-in when unauthenticated. Server-only. */
export async function requireUserId(): Promise<string> {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return session.user.id;
}
