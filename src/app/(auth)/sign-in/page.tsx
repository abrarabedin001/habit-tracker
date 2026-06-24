import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getSession } from "@/lib/auth-helpers";

export default async function SignInPage() {
  if (await getSession()) redirect("/");

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted">Sign in to track your habits.</p>
      </div>
      <AuthForm mode="sign-in" />
    </div>
  );
}
