import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import Header from "../components/Header";
import NFTCard from "../components/NFTCard";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";
const contractABI = [
  "function totalSupply() view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function MINT_PRICE() view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

export default function Collection() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSupply, setTotalSupply] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    try {
      setLoading(true);
      const provider = new ethers.JsonRpcProvider();
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const supply = await contract.totalSupply();
      setTotalSupply(supply.toString());

      // Generate mock NFT data (in production, fetch from IPFS/API)
      const mockNFTs = [];
      const maxDisplay = Math.min(parseInt(supply), 12);
      for (let i = 0; i < maxDisplay; i++) {
        mockNFTs.push({
          id: i,
          name: `Genesis NFT #${String(i + 1).padStart(4, "0")}`,
          image: `https://via.placeholder.com/240x260/7c3aed/ffffff?text=NFT+${i + 1}`,
          price: "0.08",
          owner: "0x..."
        });
      }
      setNfts(mockNFTs);
      setError("");
    } catch (err) {
      console.error("Error fetching NFTs:", err);
      setError("Failed to load collection. Check contract address.");
      setNfts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container page-shell collection-page">
        <div className="section-header">
          <div>
            <h2>Collection Gallery</h2>
            <p style={{ color: "#9aaed0", marginTop: "8px" }}>Total minted: {totalSupply} / 1,000</p>
          </div>
          <Link href="/mint">
            <button className="primary-btn">Mint NFT</button>
          </Link>
        </div>

        {error && <p style={{ color: "#ff6b6b", marginBottom: "20px" }}>⚠️ {error}</p>}

        {loading ? (
          <p style={{ textAlign: "center", color: "#9aaed0" }}>Loading collection...</p>
        ) : nfts.length > 0 ? (
          <div className="nft-grid">
            {nfts.map((nft) => (
              <Link key={nft.id} href={`/nft/${nft.id}`}>
                <a>
                  <NFTCard nft={nft} />
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#9aaed0" }}>No NFTs minted yet.</p>
        )}
      </main>
    </>
  );
}
