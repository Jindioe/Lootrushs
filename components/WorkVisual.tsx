import type { ReactNode } from "react";
import Image from "next/image";

function Overlay({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
      <div className="rounded-xl border border-line bg-card/90 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-4">
        <p className="truncate text-[10px] uppercase tracking-[0.16em] text-gold">{title}</p>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

function BrickFiBody() {
  return (
    <>
      <p className="font-display text-lg text-ink">Harbor Residences · 1/8 share</p>
      <div className="mt-2 flex gap-3 text-[11px] text-muted">
        <span className="text-gold">12.4% yield</span>
        <span>$420 this quarter</span>
      </div>
    </>
  );
}

function VaultBody() {
  return (
    <div className="space-y-1.5">
      {[
        ["ETH-USDC", "8.4% APY"],
        ["stETH loop", "11.1% APY"],
      ].map(([name, apy]) => (
        <div key={name} className="flex justify-between text-[11px]">
          <span className="text-ink">{name}</span>
          <span className="text-gold">{apy}</span>
        </div>
      ))}
    </div>
  );
}

function DaoBody() {
  return (
    <>
      <p className="text-sm text-ink">Increase treasury buffer to 18 months</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg">
        <div className="h-full w-[72%] bg-gold" />
      </div>
      <p className="mt-2 text-[11px] text-muted">For 72% · 1,204 voters</p>
    </>
  );
}

function GameBody() {
  return (
    <div className="flex gap-2">
      {["Blade #2041", "Ember Core", "Forge Pass"].map((item) => (
        <span key={item} className="rounded-md border border-line bg-bg px-2 py-1 text-[10px] text-ink">
          {item}
        </span>
      ))}
    </div>
  );
}

function BridgeBody() {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted">Ethereum</span>
      <span className="text-gold">1,200 USDC →</span>
      <span className="text-muted">Base</span>
    </div>
  );
}

function WalletBody() {
  return (
    <>
      <p className="font-display text-lg text-ink">$4,280.12</p>
      <p className="font-mono text-[11px] text-muted">0x7A91…c4E2 · passkey</p>
    </>
  );
}

const visuals: Record<string, { photo: string; alt: string; title: string; body: () => ReactNode }> = {
  brickfi: {
    photo: "/media/brickfi.jpg",
    alt: "Modern residence listed on BrickFi",
    title: "BrickFi · Investor",
    body: BrickFiBody,
  },
  vaultlayer: {
    photo: "/media/vaultlayer.jpg",
    alt: "Yield markets on Vaultlayer",
    title: "Vaultlayer · Yield",
    body: VaultBody,
  },
  "signal-dao": {
    photo: "/media/signal-dao.jpg",
    alt: "Signal DAO working session",
    title: "Signal DAO · Proposal",
    body: DaoBody,
  },
  emberforge: {
    photo: "/media/emberforge.jpg",
    alt: "Players in the Emberforge economy",
    title: "Emberforge · Inventory",
    body: GameBody,
  },
  bridgerush: {
    photo: "/media/bridgerush.jpg",
    alt: "Cross-chain network for BridgeRush",
    title: "BridgeRush · Transfer",
    body: BridgeBody,
  },
  "keystone-aa": {
    photo: "/media/keystone.jpg",
    alt: "Keystone wallet on phone and desktop",
    title: "Keystone · Passkey",
    body: WalletBody,
  },
};

export function WorkVisual({ slug, className = "aspect-[16/10]" }: { slug: string; className?: string }) {
  const visual = visuals[slug] ?? visuals.brickfi;
  const Body = visual.body;

  return (
    <div className={`relative overflow-hidden bg-bg ${className}`}>
      <Image src={visual.photo} alt={visual.alt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
      <Overlay title={visual.title}>
        <Body />
      </Overlay>
    </div>
  );
}
