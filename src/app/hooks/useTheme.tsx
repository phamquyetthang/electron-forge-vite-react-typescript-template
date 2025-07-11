import { useAppContext } from '../AppContext';

const useTheme = () => {
  const { setTheme, theme } = useAppContext();

  const onChangeTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    electron.store.set('theme', newTheme);
  };

  return { theme, onChangeTheme };
};

export default useTheme;
