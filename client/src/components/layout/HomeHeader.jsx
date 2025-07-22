import { Logo } from './Logo';
import ThemeToggle from '../common/ThemeToggle'; // Make sure this path is correct

const HomeHeader = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Logo size="large" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;