import React from 'react';
import RewardRate from './RewardRate';
import StakedAmount from './StakedAmount';
import EarnedReward from './EarnedReward';

const Display = () => {
    return (
        <div>
            <StakedAmount />
            <RewardRate />
            <EarnedReward />
        </div>
    )
};

export default Display;