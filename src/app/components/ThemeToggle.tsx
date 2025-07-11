import useTheme from '../hooks/useTheme';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, onChangeTheme } = useTheme();

  return (
    <Button onClick={() => onChangeTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ThemeToggle;
