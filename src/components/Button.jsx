import React from 'react';

// Functional component representing a button
const Button = ({ onClick, label, type }) => {
  return (
    // Render a button element with the specified type, label, and onClick event handler
    <button type={type} onClick={onClick}>{label}</button>
  )
};

export default Button;