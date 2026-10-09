import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";

export default function NFTDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [nft, setNft] = useState(null);

  useEffect(() => {
    if (id) {
      // Mock NFT data - in production, fetch from contract or API
      setNft({
        id: id,
        name: `Genesis NFT #${String(id).padStart(4, "0")}`,
        description: "A unique Genesis NFT from the LUNAVERSE collection. Limited to 1,000 total mints. Each NFT grants access to exclusive benefits and holder rewards.",
        image: `https://via.placeholder.com/500x500/7c3aed/ffffff?text=NFT+${id}`,
        price: "0.08",
        owner: "0x742d35Cc6634C0532925a3b844Bc9e7595f42E...",
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x...",
        traits: [
          { name: "Rarity", value: "Common" },
          { name: "Collection", value: "Genesis" },
          { name: "Edition", value: `1 of 1,000` }
        ]
      });
    }
  }, [id]);

  if (!nft) {
    return (
      <>
        <Header />
        <main className="container page-shell">
          <p>Loading...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container page-shell">
        <Link href="/collection">
          <a style={{ color: "#7dd3fc", marginBottom: "20px", display: "inline-block" }}>← Back to Collection</a>
        </Link>

        <div className="nft-detail" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "30px" }}>
          <div>
            <img src={nft.image} alt={nft.name} style={{ borderRadius: "20px", border: "1px solid rgba(148, 163, 184, 0.2)" }} />
          </div>

          <div>
            <h1 style={{ fontSize: "2.2rem", marginBottom: "10px" }}>{nft.name}</h1>
            <p style={{ color: "#9aaed0", marginBottom: "30px" }}>{nft.description}</p>

            <div style={{ backgroundColor: "rgba(15, 23, 42, 0.5)", padding: "20px", borderRadius: "14px", marginBottom: "30px" }}>
              <p style={{ color: "#9aaed0", fontSize: "0.9rem", marginBottom: "8px" }}>CURRENT PRICE</p>
              <h2 style={{ fontSize: "2rem", margin: "0" }}>{nft.price} Ξ</h2>
              <p style={{ color: "#7dd3fc", marginTop: "4px", fontSize: "0.85rem" }}>≈ ${(parseFloat(nft.price) * 2500).toFixed(2)} USD</p>
            </div>

            <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Properties</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "30px" }}>
              {nft.traits.map((trait, idx) => (
                <div key={idx} style={{ backgroundColor: "rgba(125, 211, 252, 0.1)", padding: "15px", borderRadius: "10px", textAlign: "center" }}>
                  <p style={{ color: "#7dd3fc", fontSize: "0.75rem", textTransform: "uppercase", margin: "0 0 4px" }}>{trait.name}</p>
                  <p style={{ margin: "0", fontSize: "0.95rem" }}>{trait.value}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(148, 163, 184, 0.15)", paddingTop: "20px" }}>
              <p style={{ color: "#9aaed0", fontSize: "0.85rem", marginBottom: "4px" }}>Contract Address</p>
              <p style={{ margin: "0", wordBreak: "break-all", fontSize: "0.9rem" }}>{nft.contractAddress}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
