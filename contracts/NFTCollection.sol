pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract GenesisNFT is ERC721URIStorage, Ownable, Pausable, ERC2981 {
    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public MINT_PRICE = 0.08 ether;

    string public baseURI;
    uint256 private _tokenIdCounter;
    bool public whitelistEnabled;
    mapping(address => bool) public whitelist;

    event MintPriceUpdated(uint256 newPrice);
    event WhitelistUpdated(address[] addresses, bool enabled);
    event RoyaltyUpdated(address recipient, uint96 feeNumerator);

    constructor(string memory _baseTokenURI) ERC721("GenesisNFT", "GNFT") Ownable(msg.sender) {
        baseURI = _baseTokenURI;
        whitelistEnabled = false;
        _setDefaultRoyalty(msg.sender, 500); // 5% royalty
    }

    function mint(address to) external payable whenNotPaused {
        require(_tokenIdCounter < MAX_SUPPLY, "Max supply reached");
        require(msg.value >= MINT_PRICE, "Insufficient ETH");

        if (whitelistEnabled) {
            require(whitelist[msg.sender], "Not whitelisted");
        }

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter += 1;

        _safeMint(to, tokenId);
    }

    function mintWithTokenURI(address to, string memory tokenURI) external onlyOwner {
        require(_tokenIdCounter < MAX_SUPPLY, "Max supply reached");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter += 1;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function mintToMany(address[] calldata recipients, string[] calldata tokenURIs) external payable onlyOwner {
        require(_tokenIdCounter + recipients.length <= MAX_SUPPLY, "Exceeds max supply");
        require(msg.value >= MINT_PRICE * recipients.length, "Insufficient ETH");
        require(recipients.length == tokenURIs.length, "Mismatched array lengths");

        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 tokenId = _tokenIdCounter;
            _tokenIdCounter += 1;
            _safeMint(recipients[i], tokenId);
            _setTokenURI(tokenId, tokenURIs[i]);
        }
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function setMintPrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "Price must be greater than 0");
        MINT_PRICE = newPrice;
        emit MintPriceUpdated(newPrice);
    }

    function setWhitelist(address[] calldata addresses, bool enabled) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = enabled;
        }
        emit WhitelistUpdated(addresses, enabled);
    }

    function setWhitelistMode(bool enabled) external onlyOwner {
        whitelistEnabled = enabled;
    }

    function isWhitelisted(address account) external view returns (bool) {
        return whitelist[account];
    }

    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external onlyOwner {
        require(feeNumerator <= 10000, "Royalty fee will exceed salePrice");
        _setDefaultRoyalty(receiver, feeNumerator);
        emit RoyaltyUpdated(receiver, feeNumerator);
    }

    function deleteDefaultRoyalty() external onlyOwner {
        _deleteDefaultRoyalty();
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function nextTokenId() external view returns (uint256) {
        return _tokenIdCounter;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    receive() external payable {}
}
