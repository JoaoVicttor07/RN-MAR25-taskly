import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserData = {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
};

type UserContextType = {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};