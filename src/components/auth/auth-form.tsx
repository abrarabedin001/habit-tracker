"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

/** Email/password sign-in or sign-up form, backed by the better-auth client. */
export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const isSignUp = mode === "sign-up";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const { error } = isSignUp
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });

    if (error) {
      setError(error.message ?? "Something went wrong");
      setPending(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {isSignUp && (
        <Field
          label="Name"
          type="text"
          value={name}
          onChange={setName}
          autoComplete="name"
          required
        />
      )}
      <Field
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
        required
      />
      <Field
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        autoComplete={isSignUp ? "new-password" : "current-password"}
        required
        minLength={8}
      />

      {error && <p className="text-sm font-medium text-rose-500">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-foreground py-3.5 text-base font-semibold text-background transition active:scale-95 disabled:opacity-60"
      >
        {pending ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}
      </button>

      <p className="pt-2 text-center text-sm text-muted">
        {isSignUp ? "Already have an account? " : "No account yet? "}
        <Link
          href={isSignUp ? "/sign-in" : "/sign-up"}
          className="font-semibold text-foreground underline"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  ...props
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold">{label}</span>
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-accent"
      />
    </label>
  );
}
