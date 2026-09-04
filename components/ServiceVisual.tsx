import Image from "next/image";

const visuals: Record<string, { photo: string; alt: string; kicker: string; title: string }> = {
  "smart-contracts": {
    photo: "/media/contracts.jpg",
    alt: "Engineer writing protocol code",
    kicker: "Solidity · Rust · Move",
    title: "Contracts, tests, upgrade path",
  },
  dapps: {
    photo: "/media/dapps.jpg",
    alt: "Wallet-connected product on a phone",
    kicker: "Next.js · wagmi",
    title: "Mint, swap, and dashboard UI",
  },
  defi: {
    photo: "/media/defi.jpg",
    alt: "Live markets on laptop, phone, and watch",
    kicker: "AMMs · lending",
    title: "Vaults and liquidity people can use",
  },
  "rwa-real-estate": {
    photo: "/media/brickfi.jpg",
    alt: "Tokenized residential property",
    kicker: "Tokenization",
    title: "On-chain property shares",
  },
  "nfts-gaming": {
    photo: "/media/emberforge.jpg",
    alt: "Players with in-game assets",
    kicker: "ERC-721 · 1155",
    title: "Inventory, mint, and royalties",
  },
  "wallets-identity": {
    photo: "/media/keystone.jpg",
    alt: "Passkey wallet across devices",
    kicker: "AA · passkeys",
    title: "Onboarding without a seed-phrase stall",
  },
  infra: {
    photo: "/media/infra.jpg",
    alt: "Chain infrastructure in production",
    kicker: "Indexers · RPCs",
    title: "Keep the product live",
  },
};

export function ServiceVisual({ slug, className = "aspect-[16/10]" }: { slug: string; className?: string }) {
  const visual = visuals[slug] ?? visuals["smart-contracts"];

  return (
    <div className={`relative overflow-hidden bg-bg ${className}`}>
      <Image src={visual.photo} alt={visual.alt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/35 to-transparent" />
      <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
        <div className="rounded-xl border border-line bg-card/90 p-3 backdrop-blur-md sm:p-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-gold">{visual.kicker}</p>
          <p className="mt-2 font-display text-lg text-ink">{visual.title}</p>
        </div>
      </div>
    </div>
  );
}
