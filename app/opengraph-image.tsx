import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07070a",
          color: "#f6f1e6",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#e8b84a" }}>
          LOOTRUSHS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            Blockchain software.
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#e8b84a", lineHeight: 1.05 }}>
            Built for mainnet.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#9a9386" }}>
            Contracts · dApps · BrickFi · DeFi · wallets
          </div>
        </div>
      </div>
    ),
    size,
  );
}
