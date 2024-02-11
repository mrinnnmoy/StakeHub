import React, { useState, useEffect, useContext } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

const RewardRate = () => {
    // Get the staking contract and selected account from context
    const { stakingContract, selectedAccount } = useContext(Web3Context);

    // State to store the reward rate
    const [rewardRate, setRewardRate] = useState("0");

    useEffect(() => {
        // Function to fetch the reward rate
        const fetchRewardRate = async () => {
            try {
                // Fetch the reward rate in wei
                const rewardRateWei = await stakingContract.REWARD_RATE();

                // Convert the reward rate to ether
                const rewardRateEth = ethers.formatUnits(rewardRateWei.toString(), 18);

                // Update the state with the reward rate
                setRewardRate(rewardRateEth);
            } catch (error) {
                // Show error toast if fetching the reward rate fails
                toast.error("Error fetching reward rate...");
                console.error(error.message);
            }
        };
        // Fetch the reward rate when staking contract is available
        stakingContract && fetchRewardRate();
    }, [stakingContract, selectedAccount]);

    return (
        // Render the reward rate component with the reward rate value
        <div className="reward-rate">
            <p>Reward Rate:</p>
            <span>{rewardRate} token/sec </span>
        </div>
    );
};

export default RewardRate;