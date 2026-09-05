export function StatBar({
  items,
}: {
  items: Array<{ value: string; label: string }>;
}) {
  return (
    <section className="border-t border-line bg-raised">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-y divide-line px-5 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {items.map((item) => (
          <div key={item.label} className="py-8 sm:px-6">
            <dt className="font-display text-3xl text-gold md:text-4xl">{item.value}</dt>
            <dd className="mt-2 text-xs uppercase tracking-wide text-muted">{item.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
