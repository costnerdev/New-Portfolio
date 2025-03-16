import React, { useState, type Dispatch, type SetStateAction } from 'react'

type CursorType = { active: boolean }
type CursorContextType = [CursorType, Dispatch<SetStateAction<CursorType>>]

export const CursorContext = React.createContext<CursorContextType | null>(null);

interface Props {
  children: React.ReactNode
}

const CursorObserver = ({ children }: Props) => {
  const [cursor, setCursor] = useState({ active: false });

  return (
    <CursorContext.Provider value={[cursor, setCursor]}>
      {children}
    </CursorContext.Provider>
  );
};

export default CursorObserver