export const site = {
  name: "Lootrushs",
  domain: "lootrushs.com",
  url: "https://lootrushs.com",
  email: "hello@lootrushs.com",
  tagline: "Web3 products for clients. Talent to ship them.",
  location: "Remote · Worldwide",
  description:
    "Lootrushs is a Web3 development and talent company. We build blockchain products for client companies, and we hire and manage the developers who do that work.",
};

export const media = {
  hero: "/media/hero.jpg",
  about: "/media/about.jpg",
  careers: "/media/careers.jpg",
  contact: "/media/about.jpg",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const chains = [
  "Ethereum",
  "Solana",
  "Polygon",
  "Arbitrum",
  "Base",
  "Optimism",
  "BNB Chain",
  "Avalanche",
];

export const services = [
  {
    slug: "smart-contracts",
    name: "Smart contracts",
    stack: "Solidity · Rust · Move",
    photo: "/media/contracts.jpg",
    blurb:
      "Protocol-grade contracts for tokens, vaults, staking, governance, and custom on-chain logic — with tests, gas care, and upgrade paths.",
  },
  {
    slug: "dapps",
    name: "dApps & product UI",
    stack: "Next.js · wagmi · ethers",
    photo: "/media/dapps.jpg",
    blurb:
      "Wallet-connected apps that feel like real products: mint flows, dashboards, swaps, and admin tools people can actually use.",
  },
  {
    slug: "defi",
    name: "DeFi protocols",
    stack: "AMMs · lending · restaking",
    photo: "/media/defi.jpg",
    blurb:
      "Markets, liquidity, yield, and risk systems designed around real user flows — not a whitepaper left on a whiteboard.",
  },
  {
    slug: "rwa-real-estate",
    name: "RWA & real estate",
    stack: "Tokenization · fractional ownership",
    photo: "/media/brickfi.jpg",
    blurb:
      "On-chain property and real-world asset products: share issuance, investor onboarding, distributions, and reporting — the same work we delivered on BrickFi for a client.",
  },
  {
    slug: "nfts-gaming",
    name: "NFTs, gaming & drops",
    stack: "ERC-721 · 1155 · compressed NFTs",
    photo: "/media/emberforge.jpg",
    blurb:
      "Collections, marketplaces, in-game assets, and reveal mechanics with minting, royalties, and inventory that holds up under load.",
  },
  {
    slug: "wallets-identity",
    name: "Wallets & identity",
    stack: "AA · SIWE · passkeys",
    photo: "/media/keystone.jpg",
    blurb:
      "Onboarding that does not stall at the seed phrase. Account abstraction, social login, and session keys for consumer products.",
  },
  {
    slug: "infra",
    name: "Chain infrastructure",
    stack: "Indexers · RPCs · oracles",
    photo: "/media/infra.jpg",
    blurb:
      "Indexers, subgraphs, relayers, oracles, and node plumbing so your product stays live when the chain gets noisy.",
  },
];

export const projects = [
  {
    slug: "brickfi",
    name: "BrickFi",
    type: "Real estate",
    chain: "Ethereum · Polygon",
    photo: "/media/brickfi.jpg",
    blurb:
      "A client real estate investment platform for fractional property ownership. Lootrushs developed, completed, and delivered on-chain shares, distributions, and the investor dashboard.",
  },
  {
    slug: "vaultlayer",
    name: "Vaultlayer",
    type: "Protocol",
    chain: "Base · Optimism",
    photo: "/media/vaultlayer.jpg",
    blurb:
      "Modular yield vaults with strategy plugins, role-based admin, and real-time TVL reporting across L2s.",
  },
  {
    slug: "signal-dao",
    name: "Signal DAO",
    type: "Governance",
    chain: "Polygon",
    photo: "/media/signal-dao.jpg",
    blurb:
      "Proposal, voting, and treasury tooling with on-chain execution and off-chain discussion that actually stays in sync.",
  },
  {
    slug: "emberforge",
    name: "Emberforge",
    type: "Gaming / NFT",
    chain: "Solana",
    photo: "/media/emberforge.jpg",
    blurb:
      "In-game asset economy: compressed NFTs, craft-and-burn loops, and a marketplace with instant settlement.",
  },
  {
    slug: "bridgerush",
    name: "BridgeRush",
    type: "Cross-chain",
    chain: "Multi-chain",
    photo: "/media/bridgerush.jpg",
    blurb:
      "A token and message bridge with light-client proofs, retryable transfers, and operator dashboards for support teams.",
  },
  {
    slug: "keystone-aa",
    name: "Keystone AA",
    type: "Wallets",
    chain: "EVM",
    photo: "/media/keystone.jpg",
    blurb:
      "Account-abstraction wallet kit: passkey signers, session keys, paymasters, and a drop-in React SDK.",
  },
];

export const values = [
  {
    title: "Talent plus delivery",
    body: "We recruit under the Lootrushs name and stay the employer. Developers work through us while they build and support the client’s product.",
  },
  {
    title: "Ship the client’s product",
    body: "Contracts, tests, and product surfaces that go to mainnet. Discovery is short. Delivery is the point.",
  },
  {
    title: "Security is part of the build",
    body: "Invariants, fuzzing, access control, and upgrade safety sit in the same sprint as features — not a week after launch.",
  },
  {
    title: "Multi-chain by default",
    body: "Ethereum, L2s, Solana, and adjacent ecosystems. We pick the chain for the client’s product, not the other way around.",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Scope the client work",
    body: "We map the protocol, threat model, and product surface — what lives on-chain, what stays off, and what must ship first.",
  },
  {
    n: "02",
    title: "Staff and build",
    body: "We hire or assign developers through Lootrushs, then ship contracts, indexers, and dApp UI as one team.",
  },
  {
    n: "03",
    title: "Deliver and support",
    body: "Mainnet deploy, monitoring, and ongoing development. The product stays the client’s. The bench stays ours.",
  },
];

export const hiringSteps = [
  {
    n: "01",
    title: "Apply or get introduced",
    body: "Roles are posted under the Lootrushs name. We source candidates, or a client finds someone and sends them to us for the formal process.",
  },
  {
    n: "02",
    title: "Lootrushs hiring",
    body: "We screen, interview, and decide if you are a fit for our bench and for the kind of client work we take.",
  },
  {
    n: "03",
    title: "Client interview",
    body: "After you pass our process, you may complete a final interview with the client company before joining that project.",
  },
  {
    n: "04",
    title: "Join through Lootrushs",
    body: "If both sides agree, you work through Lootrushs — developing, maintaining, and supporting the client’s blockchain product.",
  },
];
