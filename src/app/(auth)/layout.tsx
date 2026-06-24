/** Centered, phone-width shell for the auth screens (no app nav). */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center bg-background px-6">
      {children}
    </div>
  );
}
