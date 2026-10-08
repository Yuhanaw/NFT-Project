pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract GenesisNFT is ERC721URIStorage, Ownable, Pausable {
    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public constant MINT_PRICE = 0.08 ether;

    string public baseURI;
    uint256 private _tokenIdCounter;
    bool public whitelistEnabled;
    mapping(address => bool) public whitelist;

    constructor(string memory _baseTokenURI) ERC721("GenesisNFT", "GNFT") Ownable(msg.sender) {
        baseURI = _baseTokenURI;
        whitelistEnabled = false;
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

    function mintToMany(address[] calldata recipients) external payable onlyOwner {
        require(_tokenIdCounter + recipients.length <= MAX_SUPPLY, "Exceeds max supply");
        require(msg.value >= MINT_PRICE * recipients.length, "Insufficient ETH");

        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 tokenId = _tokenIdCounter;
            _tokenIdCounter += 1;
            _safeMint(recipients[i], tokenId);
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

    function setWhitelist(address[] calldata addresses, bool enabled) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = enabled;
        }
    }

    function setWhitelistMode(bool enabled) external onlyOwner {
        whitelistEnabled = enabled;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    receive() external payable {}
}
