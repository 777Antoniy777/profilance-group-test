import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="site-wrapper">
        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item active-nav-item">
              <a href="#">Главная</a>
            </li>

            <li className="nav__item">
              <a href="#">Новости</a>
            </li>

            <li className="nav__item">
              <a href="#">Вход</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
