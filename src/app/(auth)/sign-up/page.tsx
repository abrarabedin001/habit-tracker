import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getSession } from "@/lib/auth-helpers";

export default async function SignUpPage() {
  if (await getSession()) redirect("/");

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Create account
        </h1>
        <p className="text-sm text-muted">Start tracking your habits today.</p>
      </div>
      <AuthForm mode="sign-up" />
    </div>
  );
}
