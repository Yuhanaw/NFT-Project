import NFTCard from "../components/NFTCard";

const collection = [
  {
    title: "Nova Rider",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    price: "0.32 ETH",
    edition: "#011 / 25",
    description: "A sculptural concept inspired by futuristic speed and motion.",
  },
  {
    title: "Crystal Echo",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    price: "0.25 ETH",
    edition: "#012 / 25",
    description: "Geometric light study with reflective crystal fragments.",
  },
  {
    title: "Moon Arc",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=80",
    price: "0.41 ETH",
    edition: "#013 / 25",
    description: "Orbit-inspired art from deep-space and lunar exploration.",
  },
  {
    title: "Synth Bloom",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    price: "0.17 ETH",
    edition: "#014 / 25",
    description: "An atmospheric color palette balancing softness and intensity.",
  },
  {
    title: "Quantum Mist",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=900&q=80",
    price: "0.28 ETH",
    edition: "#015 / 25",
    description: "Haze, gradient, and motion blended into a digital dreamscape.",
  },
  {
    title: "Voltage Bloom",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    price: "0.22 ETH",
    edition: "#016 / 25",
    description: "Neon textures shaped by rhythm, flow, and vibrant contrast.",
  },
];

export default function CollectionPage() {
  return (
    <main className="container page-shell">
      <section className="section-block collection-page">
        <div className="section-header">
          <div>
            <span className="eyebrow">Collection</span>
            <h2>Featured NFT art</h2>
          </div>
        </div>

        <div className="nft-grid">
          {collection.map((item) => (
            <NFTCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </main>
  );
}
