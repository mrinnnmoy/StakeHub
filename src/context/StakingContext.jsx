import React, { useState, createContext } from 'react';

// Create a new context for the staking provider
const StakingContext = createContext();

// Create a provider component for the staking context
export const StakingProvider = ({ children }) => {
  // Define state for reload status
  const [isReload, setIsReload] = useState(false);

  // Provide the state and setter function to the context provider
  return (
    <StakingContext.Provider value={{ isReload, setIsReload }}>
      {children}
    </StakingContext.Provider>
  )
};

export default StakingContext;