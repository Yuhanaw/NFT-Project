const nftItems = [
  {
    id: 1,
    name: "Neon Galaxy #1",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=900&q=80",
    price: "0.18 ETH",
    edition: "1/10",
  },
  {
    id: 2,
    name: "Cyber Cat #2",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    price: "0.21 ETH",
    edition: "2/10",
  },
  {
    id: 3,
    name: "Aurora Bloom #3",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    price: "0.14 ETH",
    edition: "3/10",
  },
  {
    id: 4,
    name: "Pixel Tide #4",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    price: "0.19 ETH",
    edition: "4/10",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">Digital Art Collection</span>
          <h1>Discover rare NFTs built for the next generation of creators.</h1>
          <p>
            Collect unique digital assets, support artists, and own verified pieces on the blockchain.
          </p>

          <div className="cta-row">
            <button className="primary-btn">Explore Collection</button>
            <button className="secondary-btn">Create NFT</button>
          </div>

          <div className="stats-row">
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
          <div className="nft-card feature-card">
            <img
              src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=80"
              alt="Featured NFT"
            />
            <div className="card-meta">
              <div>
                <p>Featured Drop</p>
                <h3>Solar Forge</h3>
              </div>
              <span>0.42 ETH</span>
            </div>
          </div>
        </div>
      </section>

      <section className="collection">
        <div className="section-header">
          <div>
            <span className="eyebrow">Collection</span>
            <h2>Trending NFTs</h2>
          </div>
          <button className="secondary-btn">View All</button>
        </div>

        <div className="nft-grid">
          {nftItems.map((item) => (
            <article key={item.id} className="nft-card">
              <img src={item.image} alt={item.name} />
              <div className="card-body">
                <div className="card-topline">
                  <h3>{item.name}</h3>
                  <span>{item.edition}</span>
                </div>
                <div className="card-bottomline">
                  <span>Current price</span>
                  <strong>{item.price}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
