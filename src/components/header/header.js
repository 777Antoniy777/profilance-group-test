import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AppRoute, AuthorizationStatus} from "../../js/enums";
import {getAuthorizationStatus} from "../../selectors/user/selectors";
import {UserActionCreator} from "../../actions/user/action-creator";
import {PopupActionCreator} from "../../actions/popup/action-creator";

const Header = ({authorizationStatus, setUsername, setAuthorizationStatus, changePopupStatus}) => {
  const handlePopupOpen = (evt) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.AUTH) {
      // dispatchers
      setUsername('Гость');
      setAuthorizationStatus(AuthorizationStatus.NO_AUTH);

      return false;
    }

    // dispatcher
    changePopupStatus(true);
  };

  return (
    <header className="header">
      <div className="site-wrapper">
        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to={AppRoute.MAIN}>Главная</Link>
            </li>

            <li className="nav__item">
              <Link to={AppRoute.NEWS}>Новости</Link>
            </li>

            <li className="nav__item">
              <a href="#" onClick={handlePopupOpen}>
                { authorizationStatus === AuthorizationStatus.NO_AUTH
                  ? "Вход"
                  : "Выход"
                }
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string,
  setUsername: PropTypes.func,
  setAuthorizationStatus: PropTypes.func,
  changePopupStatus: PropTypes.func,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  setUsername: (data) => {
    dispatch(UserActionCreator.setUsername(data));
  },
  setAuthorizationStatus: (status) => {
    dispatch(UserActionCreator.setAuthorizationStatus(status));
  },
  changePopupStatus: (status) => {
    dispatch(PopupActionCreator.changePopupStatus(status));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
