import React, { useState, useEffect } from 'react';

const Ponumber = ({ onPoNumberGenerate }) => {
  const [poNumber, setPoNumber] = useState(null); // Add state to store the PO number

  useEffect(() => {
    const generatePoNumber = () => {
      const generatedNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
      setPoNumber(generatedNumber); // Update the component's state
      onPoNumberGenerate(generatedNumber); // Pass to the parent component
    };

    generatePoNumber();
  }, [onPoNumberGenerate]); // Add onPoNumberGenerate to the dependency array

  return (
    <div className="tsoNum">TSO-{poNumber}</div> // Display the poNumber from state
  );
};

export default Ponumber;