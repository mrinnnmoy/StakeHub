// Reward Token, 100,000,000 FIAT
// SPDX-License-Identifier: MIT

// Specify Solidty version.
pragma solidity ^0.8.20;

// Import the ERC20 contract from the OpenZeppelin library.
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Main contract named "Fiat" inherits from ERC20.
contract Fiat is ERC20 {
    // Constructor function to initialize the contract with an initial supply
    constructor(uint256 initialSupply) ERC20("Fiat", "FIAT") {
        // Mint the initial supply of tokens, assign it to the contract deployer
        // and initial supply is multiplied by 10^18 to convert from user-friendly
        //  units to the raw token units (Wei).
        _mint(msg.sender, initialSupply * 10 ** 18);
    }
}

// Contract Address at Sepolia Testnet : 0xb8b45fdadd7b471f7cd90e997b9fb0b07d852278
// Total Supply : 1,000,000