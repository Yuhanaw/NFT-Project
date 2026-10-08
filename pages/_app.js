import { useEffect, useState } from "react";
import { ethers } from "ethers";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";
const contractABI = [
  "function mint(address to) payable",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function owner() view returns (address)",
];

export default function MintPage() {
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState("Connect your wallet to mint.");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) setWallet(accounts[0]);
      }
    };

    checkWallet();
  }, []);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setStatus("Please install MetaMask or another wallet provider.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
      setStatus(`Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
    } catch (error) {
      setStatus("Connection rejected by user.");
    }
  };

  const mintNFT = async () => {
    if (!wallet) {
      setStatus("Connect wallet first.");
      return;
    }

    if (!window.ethereum) {
      setStatus("Wallet not available.");
      return;
    }

    try {
      setIsLoading(true);
      setStatus("Minting NFT...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.mint(wallet, { value: ethers.parseEther("0.08") });
      await tx.wait();

      setStatus("NFT minted successfully!");
    } catch (error) {
      console.error(error);
      setStatus("Mint failed. Check your wallet and contract configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container page-shell">
      <section className="mint-panel">
        <div className="mint-copy">
          <span className="eyebrow">Mint</span>
          <h1>Mint your Genesis NFT</h1>
          <p>
            The Genesis collection is limited, rare, and designed for the first wave of LUNAVERSE
            collectors.
          </p>

          <ul className="feature-list">
            <li>Price: 0.08 ETH</li>
            <li>Supply: 1000 NFTs</li>
            <li>Network: Ethereum-compatible wallet</li>
          </ul>
        </div>

        <div className="mint-card">
          {wallet ? (
            <p className="wallet-address">Wallet: {wallet.slice(0, 8)}...{wallet.slice(-6)}</p>
          ) : (
            <p className="wallet-address">No wallet connected</p>
          )}

          <button className="primary-btn full-width" onClick={connectWallet}>
            {wallet ? "Reconnect wallet" : "Connect wallet"}
          </button>

          <button className="secondary-btn full-width" onClick={mintNFT} disabled={isLoading}>
            {isLoading ? "Minting..." : "Mint NFT"}
          </button>

          <p className="mint-status">{status}</p>
        </div>
      </section>
    </main>
  );
}
