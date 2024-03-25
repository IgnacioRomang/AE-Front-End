// En un archivo llamado SharedStateContext.jsx
import { createContext, useContext, useState } from "react";

const SharedStateContext = createContext();

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
};

export const SharedStateProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState(false);

  return (
    <SharedStateContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </SharedStateContext.Provider>
  );
};
