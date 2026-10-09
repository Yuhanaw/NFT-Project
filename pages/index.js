import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container page-shell">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Genesis Collection</span>
            <h1>Welcome to LUNAVERSE</h1>
            <p>
              The Genesis collection is limited, rare, and designed for the first wave of LUNAVERSE
              collectors. Each NFT grants access to exclusive benefits and rewards.
            </p>

            <div className="stats-grid">
              <div>
                <strong>1,000</strong>
                <span>Total Supply</span>
              </div>
              <div>
                <strong>0.08</strong>
                <span>Price (ETH)</span>
              </div>
              <div>
                <strong>5%</strong>
                <span>Royalty</span>
              </div>
            </div>

            <div className="hero-actions">
              <Link href="/mint">
                <button className="primary-btn">Mint Now</button>
              </Link>
              <Link href="/collection">
                <button className="secondary-btn">View Collection</button>
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="featured-card">
              <img src="https://via.placeholder.com/440x500/7c3aed/ffffff?text=Genesis+NFT" alt="Featured NFT" />
              <div className="featured-card-body">
                <div>
                  <p>GENESIS #0001</p>
                  <h3>Genesis NFT</h3>
                </div>
                <span>0.08 Ξ</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
