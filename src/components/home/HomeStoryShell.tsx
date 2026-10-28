export function HomeStoryShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
