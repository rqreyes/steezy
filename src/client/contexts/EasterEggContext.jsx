import React, { createContext, useState } from 'react';

export const EasterEggContext = createContext();

const EasterEggProvider = ({ children }) => {
  const [easterEgg, setEasterEgg] = useState(false);
  const updateEasterEgg = () => setEasterEgg((prev) => !prev);

  return (
    <EasterEggContext.Provider value={{ easterEgg, updateEasterEgg }}>
      {children}
    </EasterEggContext.Provider>
  );
};

export default EasterEggProvider;
