interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({
  children,
}: PageWrapperProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {children}
    </main>
  );
}