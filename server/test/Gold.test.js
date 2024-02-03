const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Gold Contract", function () {
    let Gold;
    let gold;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy Gold contract
        const Gold = await ethers.getContractFactory("Gold");
        // Minting an initial supply of 1000 tokens
        gold = await Gold.deploy(1000);
    });

    it("Should have correct name and symbol", async function () {
        expect(await gold.name()).to.equal("Gold");
        expect(await gold.symbol()).to.equal("GOLD");
    });

    it("Should mint initial supply to owner", async function () {
        const initialSupply = await gold.totalSupply();
        // Adjusted for 18 decimals and using BigInt
        expect(initialSupply).to.equal(1000n * 10n**18n);
        expect(await gold.balanceOf(owner.address)).to.equal(1000n * 10n**18n);
    })

    // Add more test as required...
})