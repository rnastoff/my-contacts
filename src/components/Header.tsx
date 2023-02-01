import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-center items-center mt-10">
      <span className="material-symbols-outlined text-amber-500 text-4xl sm:text-5xl">
        menu_book
      </span>
      <h1 className="ml-3  font-bold text-white tracking-tight text-4xl">My Contacts</h1>
    </header>
  )
}

export default Header;