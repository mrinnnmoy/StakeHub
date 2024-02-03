const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("Fiat Contract", function () {
  let Fiat;
  let fiat;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy Fiat contract
    const Fiat = await ethers.getContractFactory("Fiat");
    // Minting an initial supply of 1000 tokens
    fiat = await Fiat.deploy(1000);
  });

  it("Should have correct name and symbol", async function () {
    expect(await fiat.name()).to.equal("Fiat");
    expect(await fiat.symbol()).to.equal("FIAT");
  });

  it("Should mint initial supply to owner", async function () {
    const initialSupply = await fiat.totalSupply();
    // Adjusted for 18 decimals and using BigInt
    expect(initialSupply).to.equal(1000n * 10n**18n);
    expect(await fiat.balanceOf(owner.address)).to.equal(1000n * 10n**18n);
  });

  // Add more test cases as needed...

});