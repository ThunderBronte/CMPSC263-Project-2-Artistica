// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DigitalArtNFT is ERC721, Ownable {
    uint256 private _nextTokenId;

    // Contract info
    string public contractName;

    address payable public buyer;
    address payable public artist;

    bool public hasNFTArtist;

    uint public deposit;
    uint public totalCost;
    uint public remainingCost;


    // Track the progress of the artist
    string[5] public projectState = ["Waiting", "Sketching", "Outlining", "Coloring", "Complete"];
    uint public currentState;


    // mapping of address to balance, used for buyer to store the money they pay
    // This will be then given to the artist in the final contract
    mapping(address => uint256) public balanceOfMoney;


    // the buyer starts the contract, the artist has the NFT
    constructor(address payable _artist) 
        ERC721("DigitalArtNFT", "DAT")
        Ownable(msg.sender)
    {
        buyer = payable(msg.sender);
        artist = _artist;
        hasNFTArtist = false;
    }

    // Give the NFT to the artist (that is the art they are creating).
    function safeMint(address to) public onlyOwner {
        require(to == artist, "Only the Artist can get the NFT art.");
        require(!hasNFTArtist, "Artist already has an NFT.");

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        hasNFTArtist = true;
    }

    // NFT stuff - uri
    function _baseURI() internal pure override returns (string memory) {
        // Folder link, not only one code 
        return "https://ipfs.io/ipfs/bafybeib7qqnh4ahsywyspwskq5n5son727zbhavvfdf7iitdkidzjj3e7a";
    }

    function tokenURI(uint256 tokenId) public view override virtual returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string.concat(baseURI, integerToString(tokenId),".json") : "";
    }

    // helper function
    function integerToString(uint _value) public pure returns (string memory) {
        // Edge case for '0'
        if (_value == 0) {
            return "0";
        }

        uint temp = _value;
        uint digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }

        bytes memory buffer = new bytes(digits);
        while (_value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + _value % 10));
            _value /= 10;
        }

        return string(buffer);
    }


    // Writes: 
    // Create the commission contract. Must pay half of total price upfront. 
    function createCommission(string memory _contractName, uint _totalCost) public payable{
        // Only the buyer can start the commission 
        require(msg.sender == buyer, "Only the buyer can start a contract.");
        totalCost = _totalCost;
        deposit = totalCost / 2;

        // buyer has to pay half of the price upfront
        require(msg.value >= deposit, "Not enough funds to start the commission contract. Please pay at least half of the total price.");
        require(msg.value <= totalCost, "The value given is more than the total cost of the agreed contact. Please pay at least half and less than the total.");
        contractName = _contractName;
        remainingCost = totalCost - msg.value;
        currentState = 0;

        // store the money paid
        balanceOfMoney[buyer] = msg.value;
    }


    // The buyer paid the artist some money
    function payArtist() public payable{
        // can only pay if the person is the buyer and the money is less than or equal to the remaining cost
        require(msg.sender == buyer, "Only the buyer can send money");
        require(remainingCost >= msg.value, "You are paying more than there is money left.");

        // reduce the remaining cost & increase the balance buyer has paid so far. contract is not done until the artist is done. 
        remainingCost -= msg.value;
        balanceOfMoney[buyer] += msg.value;
    }


    // The artist made progress 
    function updateProgress()  public{
        // progress can only be made if these two conditions are met
        require(msg.sender == artist, "Only the artist can make progress.");
        require(currentState < 4, "Project is already complete.");
        
        // Update the progress made
        currentState += 1;
    }


    // Once the commission is done, pay the artist and send the artist value to the payer
    function completeCommission( uint256 finishedArt ) public payable returns (bool success) {
        //only the artist can complete the commission
        require(msg.sender == artist, "Only the artist can complete the commission.");

        // check to see if the art is complete
        require(currentState == 4, "The art is not finished.");

        // Check if the buyer has sent enough money
        require(balanceOfMoney[buyer] == totalCost, "Insufficient funds from buyer. Unable to complete contract.");

        // pay the artist and the buyer
        payable(msg.sender).transfer(balanceOfMoney[buyer]);
        _transfer(msg.sender, buyer, finishedArt);

        // reset the balance of buyer
        balanceOfMoney[buyer] = 0;
        
        // Emit transfer event - pay the artist
        emit Transfer(buyer, msg.sender, remainingCost);

        // give the buyer the NFT, transer ownership 
        emit Transfer(msg.sender, buyer, finishedArt);
        
        return true;
    }


    // Reads: 
    // Get the remaining balance of the total price
    function getRemainingCost() public view returns(uint){
        return remainingCost;
    }

    // Get the total cost of contract
    function getTotalCost() public view returns(uint){
        return totalCost;
    }

    // Get the current state of contract
    function getCurrentState() public view returns(string memory){
        return projectState[currentState];
    }

    // Get the contract name
    function getContractName() public view returns(string memory){
        return contractName;
    }

}