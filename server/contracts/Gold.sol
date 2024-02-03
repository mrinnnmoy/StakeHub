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

// Contract Address at Polygon Mumbai : 0xb0dee3b6c1db2671531851ba9b264c9afce2658e