export const site = {
  name: "Lootrushs",
  domain: "lootrushs.com",
  url: "https://lootrushs.com",
  email: "hello@lootrushs.com",
  tagline: "Web3 products, built to ship.",
  location: "Remote · Worldwide",
  description:
    "Lootrushs is a Web3 development company. We design and ship blockchain products — smart contracts, dApps, DeFi, real estate platforms, NFTs, wallets, and cross-chain systems — for teams that need production-ready on-chain software.",
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
      "On-chain property and real-world asset products: share issuance, investor onboarding, distributions, and reporting — the same stack behind BrickFi.",
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
      "A real estate investment platform for fractional property ownership — on-chain shares, distributions, and an investor dashboard for dealing and reporting.",
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
    title: "Ship on-chain, not slide decks",
    body: "We write contracts, tests, and product surfaces that go to mainnet. Discovery is short. Delivery is the point.",
  },
  {
    title: "Security is part of the build",
    body: "Invariants, fuzzing, access control, and upgrade safety sit in the same sprint as features — not a week after launch.",
  },
  {
    title: "Chain-native, product-literate",
    body: "We speak Solidity and user flows. A mint, a swap, or a vault has to make sense to the person holding the wallet.",
  },
  {
    title: "Multi-chain by default",
    body: "Ethereum, L2s, Solana, and adjacent ecosystems. We pick the chain for the product, not the other way around.",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Scope the chain work",
    body: "We map the protocol, threat model, and product surface — what lives on-chain, what stays off, and what must ship first.",
  },
  {
    n: "02",
    title: "Build and harden",
    body: "Contracts, indexers, and dApp UI in parallel. Tests, gas, and admin paths are treated as product, not leftovers.",
  },
  {
    n: "03",
    title: "Launch and operate",
    body: "Mainnet deploy, monitoring, incident playbooks, and a handoff your team can run — or we stay on as the engineering bench.",
  },
];
