// Stake Token, 1,000,000 GOLD
// SPDX-License-Identifier: MIT

// Solidity compiler version.
pragma solidity ^0.8.20;

// Import the ERC20 contract from the OpenZeppelin library.
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Main contract named "Gold" inherits from ERC20.
contract Gold is ERC20 {
    // Constructor function to initialize the contract with an initial supply
    constructor(uint256 initialSupply) ERC20("Gold", "GOLD") {
        // Mint the initial supply of tokens, assign it to the contract deployer
        // and initial supply is multiplied by 10^18 to convert from user-friendly
        //  units to the raw token units (Wei).
        _mint(msg.sender, initialSupply * 10 ** 18);
    }
}

// Contract Address at Sepolia Testnet : 0xd0eDAa51A054337d2CEc7C31Ca27FB9543ae22C4
// Total Supply: 100,000