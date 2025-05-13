import React, { createContext, useContext, useState } from "react";

type DropdownContextType = {
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
};

const DropdownContext = createContext<DropdownContextType>({
  activeDropdown: null,
  setActiveDropdown: () => {},
});

export const DropdownProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <DropdownContext.Provider value={{ activeDropdown, setActiveDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => useContext(DropdownContext);