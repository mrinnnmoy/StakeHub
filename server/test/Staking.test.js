const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("Staking Contract", function () {
  let Staking;
  let staking;
  let StakingToken;
  let stakingToken;
  let RewardToken;
  let rewardToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy StakingToken
    StakingToken = await ethers.getContractFactory("Gold");
    stakingToken = await StakingToken.deploy(100000); // Minting an initial supply of 1000 tokens

    // Deploy RewardToken
    RewardToken = await ethers.getContractFactory("Fiat");
    rewardToken = await RewardToken.deploy(100000); // Minting an initial supply of 100,000 tokens

    // Deploy Staking contract
    Staking = await ethers.getContractFactory("Staking");
    staking = await Staking.deploy(stakingToken.address, rewardToken.address);

    console.log("StakingToken address:", stakingToken.address);
    console.log("RewardToken address:", rewardToken.address);
    console.log("Staking address:", staking.address);
    
    // Transfer some StakingToken and RewardToken to addr1 for testing
    await stakingToken.transfer(addr1.address, ethers.utils.parseEther("100"));
    await rewardToken.transfer(addr1.address, ethers.utils.parseEther("100"));

    // Approve Staking contract to spend StakingToken and RewardToken
    await stakingToken.connect(addr1).approve(staking.address, ethers.utils.parseEther("100"));
    await rewardToken.connect(addr1).approve(staking.address, ethers.utils.parseEther("100"));
  });

  it("Should stake tokens", async function () {
    const amountToStake = ethers.utils.parseEther("10");

    await staking.connect(addr1).stake(amountToStake);

    const stakedBalance = await staking.stakedBalance(addr1.address);
    const totalStakedTokens = await staking.totalStakedTokens();

    expect(stakedBalance).to.equal(amountToStake);
    expect(totalStakedTokens).to.equal(amountToStake);
  });

  it("Should withdraw staked tokens", async function () {
    const amountToStake = ethers.utils.parseEther("10");
    const amountToWithdraw = ethers.utils.parseEther("5");

    await staking.connect(addr1).stake(amountToStake);
    await staking.connect(addr1).withdrawStakedTokens(amountToWithdraw);

    const stakedBalance = await staking.stakedBalance(addr1.address);
    const totalStakedTokens = await staking.totalStakedTokens();

    expect(stakedBalance).to.equal(amountToStake.sub(amountToWithdraw));
    expect(totalStakedTokens).to.equal(amountToStake.sub(amountToWithdraw));
  });

  it("Should claim earned rewards", async function () {
    const amountToStake = ethers.utils.parseEther("10");

    await staking.connect(addr1).stake(amountToStake);

    // Assume some time has passed for rewards to accumulate

    const initialRewardBalance = await rewardToken.balanceOf(addr1.address);

    await staking.connect(addr1).getReward();

    const finalRewardBalance = await rewardToken.balanceOf(addr1.address);
    const earnedRewards = finalRewardBalance.sub(initialRewardBalance);

    expect(earnedRewards).to.be.gt(0);
  });

  // Add more test cases as needed...

});
