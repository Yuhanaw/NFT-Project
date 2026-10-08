import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand">
          LUNA<span>VERSE</span>
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/mint">Mint</Link>
        </nav>
      </div>
    </header>
  );
}
