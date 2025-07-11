import React, { useEffect } from 'react';

type TAppContext = {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
};

const initialState: TAppContext = {
  theme: 'dark',
  setTheme: () => null,
};

const AppContext = React.createContext<TAppContext>(initialState);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');

  React.useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    const defaultTheme = electron.store.get('theme') || 'dark';
    setTheme(defaultTheme);
  }, []);

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  return context;
};
