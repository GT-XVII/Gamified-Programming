import React from 'react';

interface NavigationProps {
  onLogin: () => void;
  onRegister: () => void;
  isLoggedIn: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ onLogin, onRegister, isLoggedIn }) => {
  return (
    <header className="flex overflow-hidden flex-wrap gap-10 justify-between items-center w-full h-[88px] max-md:max-w-full">
      <div className="gap-2 self-stretch p-2 my-auto tracking-tight leading-tight text-white rounded-lg font-bold min-w-[240px] text-xl">
        Gamified Programming
      </div>
      <nav className="flex gap-3">
        <button
          onClick={() => window.open('https://semester3.wixsite.com/gamifiedprogramming', '_blank')}
          className="overflow-hidden p-2 my-auto text-[color:var(--sds-color-text-brand-on-brand)] bg-transparent hover:text-red-400 transition-colors duration-200 focus:outline-none focus:border-none border-none">
          Blog
        </button>
          {!isLoggedIn ? (
            <>
            <button onClick={onLogin} className="overflow-hidden p-2 my-auto text-[color:var(--sds-color-text-brand-on-brand)] bg-transparent hover:text-red-400 transition-colors duration-200 focus:outline-none focus:border-none border-none">
              Login
            </button>
            <button onClick={onRegister} className=" flex-1 p-2 my-auto rounded-lg ] bg-neutral-200 text-black hover:bg-transparent hover:text-red-400 transition-colors duration-200 focus:outline-none focus:border-none border-none">
              Register
            </button>
          </>
        ) : (
          <div className="flex items-center">
            <img src="/user-icon.png" alt="User" className="w-8 h-8 rounded-full" />
          </div>
        )}
      </nav>
    </header>
  );
};
