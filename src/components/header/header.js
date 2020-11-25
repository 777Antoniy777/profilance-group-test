import React from "react";
import {connect} from "react-redux";
import {PopupActionCreator} from "../../actions/popup/action-creator";

const Header = ({changePopupStatus}) => {
  const handlePopupOpen = (evt) => {
    evt.preventDefault();

    changePopupStatus(true);
  };

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
              <a href="#" onClick={handlePopupOpen}>Вход</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// const mapStateToProps = (state) => ({

// });

const mapDispatchToProps = (dispatch) => ({
  changePopupStatus: (status) => {
    dispatch(PopupActionCreator.changePopupStatus(status));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Header);
