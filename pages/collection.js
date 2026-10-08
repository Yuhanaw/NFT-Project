import Header from "../components/Header";
import NFTCard from "../components/NFTCard";

const featuredNFT = {
  title: "Solar Forge",
  image:
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=80",
  price: "0.42 ETH",
  edition: "#001 / 10",
  description: "Limited-edition cosmic artwork from the first Genesis drop.",
};

const nftItems = [
  {
    title: "Neon Galaxy",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=900&q=80",
    price: "0.18 ETH",
    edition: "#002 / 10",
    description: "Electric sci-fi composition with immersive neon textures.",
  },
  {
    title: "Cyber Cat",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    price: "0.21 ETH",
    edition: "#003 / 10",
    description: "A stealth-style digital portrait with futuristic lighting.",
  },
  {
    title: "Aurora Bloom",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    price: "0.14 ETH",
    edition: "#004 / 10",
    description: "Soft gradients and abstract wave energy in motion.",
  },
  {
    title: "Pixel Tide",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    price: "0.19 ETH",
    edition: "#005 / 10",
    description: "A vivid digital tide shaped by light, data, and motion.",
  },
];

export default function Home() {
  return (
    <>
      <main className="container page-shell">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Digital Art Collection</span>
            <h1>Own rare art from the next generation of creators.</h1>
            <p>
              LUNAVERSE is a premium NFT marketplace for collectors, creators, and communities who
              want to own digital culture on-chain.
            </p>

            <div className="hero-actions">
              <a href="/collection" className="primary-btn">
                Explore collection
              </a>
              <a href="/mint" className="secondary-btn">
                Create NFT
              </a>
            </div>

            <div className="stats-grid">
              <div>
                <strong>12.4K</strong>
                <span>Collectors</span>
              </div>
              <div>
                <strong>890</strong>
                <span>Minted</span>
              </div>
              <div>
                <strong>4.8 ETH</strong>
                <span>Volume</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="featured-card">
              <img src={featuredNFT.image} alt={featuredNFT.title} />
              <div className="featured-card-body">
                <div>
                  <p>Featured Drop</p>
                  <h3>{featuredNFT.title}</h3>
                </div>
                <span>{featuredNFT.price}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-header">
            <div>
              <span className="eyebrow">Trending</span>
              <h2>Top collections</h2>
            </div>
            <a href="/collection" className="secondary-btn">
              View all
            </a>
          </div>

          <div className="nft-grid">
            {nftItems.map((item) => (
              <NFTCard key={item.title} {...item} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
