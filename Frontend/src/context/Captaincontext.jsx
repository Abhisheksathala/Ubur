import { createContext, useEffect, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <CaptainDataContext.Provider
      value={{ captain, setCaptain, isoading, setIsLoading, error, setError }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
