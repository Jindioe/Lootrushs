export function JumpNav({
  items,
}: {
  items: Array<{ href: string; label: string; count?: number }>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="rounded-full border border-line px-3 py-1.5 text-sm text-ink/90 transition hover:border-gold/40 hover:text-gold"
        >
          {item.label}
          {typeof item.count === "number" ? (
            <span className="ml-2 text-xs text-muted">{item.count}</span>
          ) : null}
        </a>
      ))}
    </div>
  );
}
