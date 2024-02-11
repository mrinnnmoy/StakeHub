import React from 'react';
import RewardRate from './RewardRate';
import StakedAmount from './StakedAmount';
import EarnedReward from './EarnedReward';
import "./Display.css";

const Display = () => {
    return (
        <div className="top-wrapper">
            <StakedAmount />
            <RewardRate />
            <EarnedReward />
        </div>
    )
};

export default Display;