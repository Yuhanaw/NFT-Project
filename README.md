html,
body,
#__next {
  margin: 0;
  min-height: 100%;
  font-family: Inter, Arial, Helvetica, sans-serif;
  background: #040816;
  color: #f5f7ff;
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  width: 100%;
}

button {
  font: inherit;
}

.container {
  max-width: 1180px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(20px);
  background: rgba(4, 8, 22, 0.7);
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 74px;
}

.brand {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.brand span {
  color: #7dd3fc;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 22px;
  color: #dfe9ff;
}

.page-shell {
  padding-top: 56px;
  padding-bottom: 90px;
}

.hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 32px;
  min-height: 70vh;
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(2.8rem, 5vw, 5rem);
  line-height: 1.02;
  letter-spacing: -0.06em;
}

.hero-copy p {
  margin: 18px 0 0;
  color: #c6d2eb;
  font-size: 1.08rem;
  line-height: 1.8;
  max-width: 620px;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 16px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(125, 211, 252, 0.5);
  color: #7dd3fc;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 30px;
}

.primary-btn,
.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 22px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.2s ease, opacity 0.2s ease;
  cursor: pointer;
  font-weight: 700;
}

.primary-btn {
  background: linear-gradient(135deg, #7c3aed, #22d3ee);
  color: white;
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.04);
  color: white;
}

.primary-btn:hover,
.secondary-btn:hover {
  transform: translateY(-2px);
  opacity: 0.96;
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 26px;
  margin-top: 28px;
}

.stats-grid div {
  min-width: 120px;
}

.stats-grid strong {
  display: block;
  font-size: clamp(1.4rem, 2vw, 2rem);
}

.stats-grid span {
  color: #9aaed0;
  font-size: 0.86rem;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.featured-card {
  width: min(100%, 440px);
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.55);
}

.featured-card img {
  height: 500px;
  object-fit: cover;
}

.featured-card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 20px 22px;
}

.featured-card-body p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.8rem;
}

.featured-card-body h3 {
  margin: 6px 0 0;
  font-size: 1.4rem;
}

.featured-card-body span {
  color: #f8fafc;
  font-weight: 700;
}

.section-block {
  margin-top: 72px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 26px;
}

.section-header h2 {
  margin: 0;
  font-size: clamp(2rem, 2vw, 2.7rem);
}

.nft-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.nft-card {
  overflow: hidden;
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.nft-image-wrap {
  overflow: hidden;
}

.nft-card img {
  height: 260px;
  object-fit: cover;
}

.nft-card-body {
  padding: 18px;
}

.nft-card-top,
.nft-card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.nft-card-top h3 {
  margin: 0;
  font-size: 1.12rem;
}

.nft-card-top span,
.nft-card-bottom span,
.nft-card-body p {
  color: #a8b7d1;
  font-size: 0.8rem;
}

.nft-card-body p {
  margin: 14px 0 18px;
  line-height: 1.6;
}

.nft-card-bottom strong {
  color: #f9fbff;
  font-size: 1rem;
}

.mint-panel {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 30px;
  align-items: center;
  min-height: 60vh;
}

.mint-copy h1 {
  margin: 0;
  font-size: clamp(2.6rem, 4vw, 4rem);
}

.mint-copy p {
  margin-top: 18px;
  color: #d6def2;
  line-height: 1.8;
}

.feature-list {
  margin: 24px 0 0;
  padding-left: 18px;
  color: #dfeafc;
  line-height: 2;
}

.mint-card {
  padding: 28px;
  border-radius: 26px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 20px 50px rgba(2, 6, 23, 0.7);
}

.wallet-address {
  margin: 0 0 18px;
  color: #cfe3ff;
  word-break: break-all;
}

.full-width {
  width: 100%;
  margin-bottom: 12px;
}

.mint-status {
  margin: 8px 0 0;
  color: #b9d7ff;
  line-height: 1.6;
}

.collection-page {
  padding-bottom: 30px;
}

@media (max-width: 860px) {
  .nav {
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 18px 0;
  }

  .hero,
  .mint-panel {
    grid-template-columns: 1fr;
  }

  .featured-card img {
    height: 360px;
  }
}
