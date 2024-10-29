import React from 'react';

interface NavigationProps {
  onLogin: () => void;
  onRegister: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onLogin, onRegister }) => {
  return (
    <header className="flex overflow-hidden flex-wrap gap-10 justify-between items-center w-full h-[88px] max-md:max-w-full">
      <div className="gap-2 self-stretch p-2 my-auto tracking-tight leading-tight text-white rounded-lg font-bold min-w-[240px] text-xl">
        Gamified Programming
      </div>
      <nav className="flex gap-3">
          <button onClick={onRegister} className="overflow-hidden p-2 my-auto text-[color:var(--sds-color-text-brand-on-brand)] bg-transparent hover:text-red-400 transition-colors duration-200 focus:outline-none focus:border-none border-none">
            Blog
          </button>
          <button onClick={onLogin} className="overflow-hidden p-2 my-auto text-[color:var(--sds-color-text-brand-on-brand)] bg-transparent hover:text-red-400 transition-colors duration-200 focus:outline-none focus:border-none border-none">
            Login
          </button>
          <button onClick={onRegister} className=" flex-1 p-2 my-auto rounded-lg ] bg-neutral-200 text-black hover:bg-transparent hover:text-red-400 transition-colors duration-200 focus:outline-none focus:border-none border-none">
            Register
          </button>
      </nav>
    </header>
  );
};
