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
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
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
    items: [
      "Token, vault, staking, and governance modules",
      "Access control, upgrade proxies, and admin paths",
      "Foundry tests, fuzzing, and deploy scripts",
      "Audit-ready documentation and ABI handoff",
    ],
  },
  {
    slug: "dapps",
    name: "dApps & product UI",
    stack: "Next.js · wagmi · ethers",
    photo: "/media/dapps.jpg",
    blurb:
      "Wallet-connected apps that feel like real products: mint flows, dashboards, swaps, and admin tools people can actually use.",
    items: [
      "Wallet connect, chain switch, and transaction states",
      "Invest, mint, swap, and admin surfaces",
      "Design systems that match the protocol",
      "Mobile-ready dApp paths",
    ],
  },
  {
    slug: "defi",
    name: "DeFi protocols",
    stack: "AMMs · lending · restaking",
    photo: "/media/defi.jpg",
    blurb:
      "Markets, liquidity, yield, and risk systems designed around real user flows — not a whitepaper left on a whiteboard.",
    items: [
      "AMMs, vaults, and strategy plugins",
      "Lending, liquidation, and oracle wiring",
      "Admin roles and emergency pauses",
      "TVL and position reporting",
    ],
  },
  {
    slug: "rwa-real-estate",
    name: "RWA & real estate",
    stack: "Tokenization · fractional ownership",
    photo: "/media/brickfi.jpg",
    blurb:
      "On-chain property and real-world asset products: share issuance, investor onboarding, distributions, and reporting — the same work we delivered on BrickFi for a client.",
    items: [
      "Share issuance and allowlists",
      "Distributions and lockups",
      "Investor onboarding and statements",
      "Eligibility gates counsel specifies",
    ],
  },
  {
    slug: "nfts-gaming",
    name: "NFTs, gaming & drops",
    stack: "ERC-721 · 1155 · compressed NFTs",
    photo: "/media/emberforge.jpg",
    blurb:
      "Collections, marketplaces, in-game assets, and reveal mechanics with minting, royalties, and inventory that holds up under load.",
    items: [
      "Mint, reveal, and royalty flows",
      "Marketplace and inventory",
      "Compressed NFTs and craft loops",
      "Launch-week load planning",
    ],
  },
  {
    slug: "wallets-identity",
    name: "Wallets & identity",
    stack: "AA · SIWE · passkeys",
    photo: "/media/keystone.jpg",
    blurb:
      "Onboarding that does not stall at the seed phrase. Account abstraction, social login, and session keys for consumer products.",
    items: [
      "Account abstraction and paymasters",
      "Passkeys and session keys",
      "SIWE and embedded wallets",
      "Recovery and policy controls",
    ],
  },
  {
    slug: "infra",
    name: "Chain infrastructure",
    stack: "Indexers · RPCs · oracles",
    photo: "/media/infra.jpg",
    blurb:
      "Indexers, subgraphs, relayers, oracles, and node plumbing so your product stays live when the chain gets noisy.",
    items: [
      "Subgraphs and custom indexers",
      "RPC strategy and keepers",
      "Oracle and cross-chain adapters",
      "Monitoring and deploy playbooks",
    ],
  },
];

export const projects = [
  {
    slug: "brickfi",
    name: "BrickFi",
    type: "RWA · Real estate",
    tags: ["RWA", "Tokenization", "dApp"],
    chain: "Ethereum · Polygon",
    service: "rwa-real-estate",
    photo: "/media/brickfi.jpg",
    blurb:
      "A client real estate investment platform for fractional property ownership. Lootrushs developed, completed, and delivered on-chain shares, distributions, and the investor dashboard.",
    challenge:
      "The client needed fractional property shares, distributions, and investor reporting that matched what counsel told buyers — not a generic DEX skin.",
    delivered: [
      "Share token, allowlists, and distribution contracts",
      "Investor browse, purchase, yield, and statement flows",
      "Admin paths for lockups and eligibility gates",
      "Staffed bench through Lootrushs for launch and support",
    ],
    stack: ["Solidity", "Next.js", "Polygon", "Ethereum"],
  },
  {
    slug: "vaultlayer",
    name: "Vaultlayer",
    type: "DeFi · Protocol",
    tags: ["DeFi", "Vaults", "L2"],
    chain: "Base · Optimism",
    service: "defi",
    photo: "/media/vaultlayer.jpg",
    blurb:
      "Modular yield vaults with strategy plugins, role-based admin, and real-time TVL reporting across L2s.",
    challenge:
      "A protocol team wanted strategy plugins and TVL reporting without giving a single admin the power to rug depositors.",
    delivered: [
      "Vault core with plugin strategies",
      "Role-based admin and pause paths",
      "Cross-L2 TVL reporting",
      "Operator dashboard for the client team",
    ],
    stack: ["Solidity", "Foundry", "Base", "Optimism"],
  },
  {
    slug: "signal-dao",
    name: "Signal DAO",
    type: "Governance",
    tags: ["DAO", "Voting", "Treasury"],
    chain: "Polygon",
    service: "smart-contracts",
    photo: "/media/signal-dao.jpg",
    blurb:
      "Proposal, voting, and treasury tooling with on-chain execution and off-chain discussion that actually stays in sync.",
    challenge:
      "Forum votes and on-chain execution were drifting. Delegates could not tell what had actually passed.",
    delivered: [
      "Proposal and voting contracts",
      "Treasury execution with role checks",
      "Discussion surface tied to on-chain state",
      "Handoff docs the client’s mods can run",
    ],
    stack: ["Solidity", "Polygon", "Next.js"],
  },
  {
    slug: "emberforge",
    name: "Emberforge",
    type: "Gaming · NFT",
    tags: ["NFT", "Gaming", "Solana"],
    chain: "Solana",
    service: "nfts-gaming",
    photo: "/media/emberforge.jpg",
    blurb:
      "In-game asset economy: compressed NFTs, craft-and-burn loops, and a marketplace with instant settlement.",
    challenge:
      "The studio needed inventory and marketplace settlement that would not stall under a drop, without 12MB motion or dead listings.",
    delivered: [
      "Compressed NFT inventory",
      "Craft-and-burn loops",
      "Marketplace with instant settlement",
      "Launch-week ops from the Lootrushs bench",
    ],
    stack: ["Rust", "Solana", "compressed NFTs"],
  },
  {
    slug: "bridgerush",
    name: "BridgeRush",
    type: "Cross-chain",
    tags: ["Bridge", "Infra", "Ops"],
    chain: "Multi-chain",
    service: "infra",
    photo: "/media/bridgerush.jpg",
    blurb:
      "A token and message bridge with light-client proofs, retryable transfers, and operator dashboards for support teams.",
    challenge:
      "Support could not see stuck transfers. Retry lived in a spreadsheet. The client needed an operator view, not only a contract.",
    delivered: [
      "Token and message bridge paths",
      "Retryable transfers",
      "Operator dashboard for support",
      "Monitoring the client team can keep",
    ],
    stack: ["Solidity", "Relayers", "Next.js"],
  },
  {
    slug: "keystone-aa",
    name: "Keystone AA",
    type: "Wallets",
    tags: ["AA", "Passkeys", "SDK"],
    chain: "EVM",
    service: "wallets-identity",
    photo: "/media/keystone.jpg",
    blurb:
      "Account-abstraction wallet kit: passkey signers, session keys, paymasters, and a drop-in React SDK.",
    challenge:
      "Consumer onboarding died at the seed phrase. The client wanted passkeys and session keys without rewriting their whole app.",
    delivered: [
      "Passkey signers and session keys",
      "Paymaster wiring",
      "Drop-in React SDK",
      "Example mint and account flows",
    ],
    stack: ["ERC-4337", "TypeScript", "React"],
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

export const audiences = [
  {
    slug: "protocols",
    name: "DeFi & protocol teams",
    blurb: "Contracts, oracles, vaults, and the dApp your users actually finish.",
    href: "/services#defi",
  },
  {
    slug: "rwa",
    name: "RWA & real estate",
    blurb: "Issuance, eligibility, distributions, and investor reporting — BrickFi-class delivery.",
    href: "/services#rwa-real-estate",
  },
  {
    slug: "studios",
    name: "Studios & consumer apps",
    blurb: "Mints, wallets, game economies, and drops that hold up under load.",
    href: "/services#nfts-gaming",
  },
  {
    slug: "fintech",
    name: "Fintechs & product companies",
    blurb: "A staffed bench through Lootrushs when you need chain work inside your product.",
    href: "/how-we-work",
  },
  {
    slug: "l2",
    name: "L1 / L2 and infra",
    blurb: "Indexers, RPCs, bridges, and the operator tools support teams can run.",
    href: "/services#infra",
  },
  {
    slug: "talent",
    name: "Teams hiring Web3 talent",
    blurb: "We source, screen, and employ developers who then join your project through us.",
    href: "/careers",
  },
];

export const engagements = [
  {
    slug: "build",
    n: "01",
    title: "Build the product",
    body: "A scoped engagement: contracts, indexer, and UI as one delivery. You own the product. We stay through launch.",
    href: "/contact",
    action: "Send a brief",
  },
  {
    slug: "staff",
    n: "02",
    title: "Staff the team",
    body: "We hire under the Lootrushs name and assign people to your project. You may do a final interview. They work through us.",
    href: "/how-we-work",
    action: "See the hiring path",
  },
  {
    slug: "both",
    n: "03",
    title: "Build and staff",
    body: "Most clients need both: a first ship, then a standing bench for maintenance. One partner for delivery and talent.",
    href: "/contact",
    action: "Start that conversation",
  },
];

export const clientProcess = [
  {
    n: "01",
    title: "Send the brief",
    body: "Chain, product, what exists, and the date you cannot miss. A repo or demo helps. A clear description is enough to start.",
  },
  {
    n: "02",
    title: "Technical read",
    body: "An engineer reads what you sent before a call. We decide if we can staff it and whether the work belongs on-chain.",
  },
  {
    n: "03",
    title: "Discovery call",
    body: "We walk through constraints: chain, custody, compliance, runway. You meet the people who would do the work.",
  },
  {
    n: "04",
    title: "Written plan",
    body: "Scope, phases, who we would staff, and a first step. We say no if we are not the right bench.",
  },
  {
    n: "05",
    title: "Staff and ship",
    body: "Developers join through Lootrushs. Contracts, tests, and product surfaces move together until mainnet.",
  },
  {
    n: "06",
    title: "Operate",
    body: "Monitoring, incident paths, and ongoing development. The product stays yours. The bench stays ours.",
  },
];

export const principles = [
  {
    title: "Honesty before contract",
    body: "If you do not need a chain, or we cannot staff the work, the plan says so. We would rather lose a brief than ship a bad one.",
  },
  {
    title: "Novelty only where it pays",
    body: "Vaults, tokens, and wallet flows start from patterns that have survived mainnet. New design work goes where your product differs.",
  },
  {
    title: "Operate what we build",
    body: "Deploy keys, monitoring, and a handoff your team can run are part of delivery — not a week after launch.",
  },
  {
    title: "One employer of record",
    body: "People on your project work through Lootrushs. That keeps hiring, access, and accountability in one place.",
  },
];

export const stack = [
  { group: "Contracts", items: ["Solidity", "Foundry", "Rust", "Move", "Hardhat"] },
  { group: "Product", items: ["Next.js", "TypeScript", "wagmi", "viem", "React Native"] },
  { group: "Data", items: ["The Graph", "Custom indexers", "Oracles", "Keepers"] },
  { group: "Accounts", items: ["Safe", "ERC-4337", "SIWE", "Passkeys"] },
];

export const faqs = [
  {
    q: "What kind of company is Lootrushs?",
    a: "A Web3 development and talent company. We build blockchain products for client companies, and we hire and manage the developers who do that work. The product belongs to the client. People on the project work through Lootrushs.",
  },
  {
    q: "Do you only write code, or do you also staff teams?",
    a: "Both. Some clients need a scoped build. Some need a standing bench. Most need a first ship and then people who stay. Roles are posted under our name; after our hiring process you may interview with the client.",
  },
  {
    q: "Is BrickFi your product?",
    a: "No. BrickFi is a client real estate platform we developed and delivered. It is an example of the work, not a Lootrushs-owned company.",
  },
  {
    q: "Which chains do you work on?",
    a: "Ethereum, Solana, Polygon, Arbitrum, Base, Optimism, BNB Chain, and Avalanche. We pick the chain for the client’s product.",
  },
  {
    q: "How do I start a project?",
    a: "Send a brief on the contact page: what you are building, the chain, and what already exists. We reply within two business days with whether we can staff it and a first step. An NDA is available before a detailed read.",
  },
  {
    q: "How do developers join a client project?",
    a: "Apply on this site, or a client can introduce you. We screen and interview. You may then do a final interview with the client. If both sides agree, you work through Lootrushs on that product.",
  },
  {
    q: "Who owns the code?",
    a: "The client. Repositories, keys, and documentation transfer with the engagement. Handoff is part of delivery.",
  },
  {
    q: "Do you take every brief?",
    a: "No. We refuse work we cannot staff or cannot secure — including unaudited upgrades on a deadline we cannot meet.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
