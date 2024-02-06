// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

// Import necessary contracts and libraries from OpenZeppelin.
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// Staking contract inheriting from ReetrancyGuard.
contract Staking is ReentrancyGuard{

    // ERC token interfaces for staking and rewarding
    IERC20 public s_stakingToken;
    IERC20 public s_rewardToken;

    // Constants and State variables
    // Reward rate (1e18 is 1.0 per second)
    uint public constant REWARD_RATE = 1e18;
    // Total staked tokens across all users
    uint private totalStakedTokens;
    // Stored reward per token value
    uint public rewardPerTokenStored;
    // Last time the rewards were updated
    uint public lastUpdateTime;

    // User-Specific data
    // Amount of staked tokens for each user.
    mapping(address => uint) public stakedBalance;
    // Accumulated rewards for each user.
    mapping(address => uint) public rewards;
    // User's reward per token paid
    mapping(address => uint) public userRewardPerTokenPaid;

    // Events emitted by the contract
    event Staked(address indexed user, uint256 indexed amount);
    event Withdrawn(address indexed user, uint256 indexed amount);
    event RewardsClaimed(address indexed user, uint256 indexed amount);

    // Constructor to initialize staking and reward tokens
    constructor(address stakingToken, address rewardToken){
        s_stakingToken = IERC20(stakingToken);
        s_rewardToken = IERC20(rewardToken);
    }

    // Function to calculate the reward per token 
    function rewardPerToken() public view returns (uint) {
        if(totalStakedTokens == 0){
            return rewardPerTokenStored;
        }
        uint totalTime = (block.timestamp) - lastUpdateTime;
        uint totalRewards = REWARD_RATE * (totalTime);
        return rewardPerTokenStored + ((totalRewards * 1e18) / (totalStakedTokens));
    }

    // Function to calculate the earned rewards for a user
    function earned(address account) public view returns (uint){
        return stakedBalance[account] * (rewardPerToken() - (userRewardPerTokenPaid[account])) / (1e18) + (rewards[account]);
    }

    // Modifier to update rewards for a user before executing a function
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        _;
    }

    // Function to stake tokens
    function stake(uint amount) external nonReentrant updateReward(msg.sender){
        require(amount > 0, "Amount must be greater than zero.");
        totalStakedTokens = totalStakedTokens + (amount);
        stakedBalance[msg.sender] = stakedBalance[msg.sender] + (amount);
        emit Staked(msg.sender, amount);
        bool success = s_stakingToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer Failed");
    }

    // Function to withdraw staked tokens
    function withdrawStakedTokens(uint amount) external nonReentrant updateReward(msg.sender) {
    require(amount > 0, "Amount must be greater than zero");
    require(stakedBalance[msg.sender] >= amount, "Staked amount not enough");
    totalStakedTokens = totalStakedTokens - (amount);
    stakedBalance[msg.sender] = stakedBalance[msg.sender] - (amount);
    emit Withdrawn(msg.sender, amount);
    bool success = s_stakingToken.transfer(msg.sender, amount);
    require(success, "Transfer Failed");
    }

    // Function to claim earned rewards
    function getReward() external nonReentrant updateReward(msg.sender) {
    uint reward = rewards[msg.sender];
    require(reward > 0, "No rewards to claim");
    rewards[msg.sender] = 0;
    emit RewardsClaimed(msg.sender, reward);
    bool success = s_rewardToken.transfer(msg.sender, reward);
    require(success, "Transfer Failed");
  }
}

// Contract deployed on Sepolia Testnet on : 0x37cDE0038Ff6f04952beFE7735e861969788A171