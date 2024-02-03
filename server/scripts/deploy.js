const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
    // Gold contract
    const Gold = await hre.ethers.getContractFactory("Gold");
    const gold = await Gold.deploy();

    // Fiat contract
    const Fiat = await hre.ethers.getContractFactory("Fiat");
    const fiat = await Fiat.deploy();

    // Staking Contract
    const Staking = await hre.ethers.getContractFactory("Staking");
    const staking = await Staking.deploy();

    await gold.deployed();
    await fiat.deployed();
    await staking.deployed();

    console.log(`Gold Contract deployed at: ${gold.address}`);
    console.log(`Fiat Contract deployed at: ${fiat.address}`);
    console.log(`Staking Contract deployed at: ${staking.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});