import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";

const EarnedReward = () => {
    // Get the staking contract and selected account from context
    const { stakingContract, selectedAccount } = useContext(Web3Context);
    
    // State to store the earned reward value
    const [rewardVal, setRewardVal] = useState("0");

    useEffect(() => {
        // Function to fetch the earned reward amount
        const fetchStakeRewardInfo = async () => {
            try {
                // Fetch the reward amount in wei
                const rewardValueWei = await stakingContract.earned(selectedAccount);
                
                // Convert the reward amount to ether and round to 2 decimal places
                const rewardValueEth = ethers.formatUnits(rewardValueWei, 18).toString();
                const roundedReward = parseFloat(rewardValueEth).toFixed(2);
                
                // Update the state with the rounded reward value
                setRewardVal(roundedReward);
            } catch (error) {
                // Show error toast if fetching the reward fails
                toast.error("Error fetching the reward:");
                console.error(error.message);
            }
        };

        // Set interval to fetch the reward amount every 20 seconds
        const interval = setInterval(() => {
            stakingContract && fetchStakeRewardInfo();
        }, 20000);

        // Clean up interval when component unmounts
        return () => clearInterval(interval);
    }, [stakingContract, selectedAccount]);

    return (
        // Render the earned reward component with the reward value
        <div className="earned-reward">
            <p>Earned Reward:</p>
            <span>{rewardVal}</span>
        </div>
    );
};

export default EarnedReward;