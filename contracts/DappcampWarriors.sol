// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DappcampWarriors is
    ERC721("DappcampWarriors", "DWAR"),
    Ownable
{
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter public _tokenIds;

    string public baseURI;
    string public baseExtension = ".json";

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _baseURIParam) public onlyOwner {
        baseURI = _baseURIParam;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension)) : "";
    }

    function mint(address to)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 newWarriorId = _tokenIds.current();
        _mint(to, newWarriorId);

        _tokenIds.increment();

        return newWarriorId;
    }
}
