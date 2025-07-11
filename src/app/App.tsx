import { LoginForm } from './components/login-form';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />

        <div className="fixed bottom-4 left-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default App;
