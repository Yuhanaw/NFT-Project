import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Header from "../components/Header";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";
const contractABI = [
  "function mint(address to) payable",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function owner() view returns (address)",
  "function MINT_PRICE() view returns (uint256)",
  "function whitelistEnabled() view returns (bool)",
  "function isWhitelisted(address account) view returns (bool)"
];

export default function MintPage() {
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState("Connect your wallet to mint.");
  const [isLoading, setIsLoading] = useState(false);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState("0");
  const [mintPrice, setMintPrice] = useState("0.08");
  const [totalSupply, setTotalSupply] = useState("0");
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [whitelistEnabled, setWhitelistEnabled] = useState(false);

  useEffect(() => {
    checkWallet();
    fetchContractDetails();
  }, []);

  const checkWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          await fetchBalance(accounts[0]);
          await checkWhitelistStatus(accounts[0]);
        }
        const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
        setChainId(parseInt(chainIdHex, 16));
      } catch (error) {
        console.error("Error checking wallet:", error);
      }
    }
  };

  const fetchBalance = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const bal = await provider.getBalance(address);
      setBalance(ethers.formatEther(bal));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchContractDetails = async () => {
    try {
      const provider = new ethers.JsonRpcProvider();
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      
      const price = await contract.MINT_PRICE();
      setMintPrice(ethers.formatEther(price));
      
      const supply = await contract.totalSupply();
      setTotalSupply(supply.toString());

      const whitelistMode = await contract.whitelistEnabled();
      setWhitelistEnabled(whitelistMode);
    } catch (error) {
      console.error("Error fetching contract details:", error);
    }
  };

  const checkWhitelistStatus = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const whitelisted = await contract.isWhitelisted(address);
      setIsWhitelisted(whitelisted);
    } catch (error) {
      console.error("Error checking whitelist:", error);
    }
  };

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setStatus("Please install MetaMask or another wallet provider.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
      await fetchBalance(accounts[0]);
      await checkWhitelistStatus(accounts[0]);
      setStatus(`Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
    } catch (error) {
      setStatus("Connection rejected by user.");
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }] // Mainnet
      });
      setStatus("Network switched. Ready to mint.");
    } catch (error) {
      setStatus("Failed to switch network.");
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

    if (whitelistEnabled && !isWhitelisted) {
      setStatus("Your wallet is not whitelisted.");
      return;
    }

    try {
      setIsLoading(true);
      setStatus("Minting NFT... confirm in your wallet.");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.mint(wallet, { value: ethers.parseEther(mintPrice) });
      setStatus("Transaction sent... waiting for confirmation.");
      
      await tx.wait();
      setStatus("🎉 NFT minted successfully! Check your wallet.");
      await fetchBalance(wallet);
    } catch (error) {
      console.error(error);
      if (error.message.includes("user rejected")) {
        setStatus("Transaction rejected by user.");
      } else if (error.message.includes("insufficient funds")) {
        setStatus("Insufficient funds to mint.");
      } else {
        setStatus(`Mint failed: ${error.message.slice(0, 50)}...`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container page-shell">
        <section className="mint-panel">
          <div className="mint-copy">
            <span className="eyebrow">Mint</span>
            <h1>Mint your Genesis NFT</h1>
            <p>
              The Genesis collection is limited to 1,000 NFTs. Each mint grants you membership in the
              LUNAVERSE ecosystem with exclusive benefits and rewards.
            </p>

            <ul className="feature-list">
              <li>✓ Price: {mintPrice} ETH</li>
              <li>✓ Total Supply: 1,000 NFTs</li>
              <li>✓ Minted: {totalSupply} / 1,000</li>
              <li>✓ Royalty: 5% (creator earnings)</li>
              <li>✓ Network: Ethereum-compatible</li>
            </ul>
          </div>

          <div className="mint-card">
            {wallet ? (
              <>
                <p className="wallet-address">📋 Wallet: {wallet.slice(0, 8)}...{wallet.slice(-6)}</p>
                <p className="mint-status">💰 Balance: {parseFloat(balance).toFixed(4)} ETH</p>
                {whitelistEnabled && (
                  <p className="mint-status" style={{ color: isWhitelisted ? "#7dd3fc" : "#ff6b6b" }}>
                    {isWhitelisted ? "✅ Whitelisted" : "❌ Not whitelisted"}
                  </p>
                )}
              </>
            ) : (
              <p className="wallet-address">No wallet connected</p>
            )}

            <button className="primary-btn full-width" onClick={connectWallet} disabled={isLoading}>
              {wallet ? "Reconnect wallet" : "Connect wallet"}
            </button>

            <button className="secondary-btn full-width" onClick={mintNFT} disabled={isLoading || !wallet}>
              {isLoading ? "Minting..." : `Mint NFT (${mintPrice} ETH)`}
            </button>

            <p className="mint-status">{status}</p>
          </div>
        </section>
      </main>
    </>
  );
}
