import React from "react";
import {connect} from "react-redux";
import CloseIcon from '@material-ui/icons/Close';
import {AuthorizationStatus} from "../../js/enums";
import {getUsers} from "../../selectors/users/selectors";
import {UserActionCreator} from "../../actions/user/action-creator";
import {PopupActionCreator} from "../../actions/popup/action-creator";

class Login extends React.PureComponent {
  state = {
    name: {
      value: '',
      message: '',
    },
    password: {
      value: '',
      message: '',
    },
  }

  handleFormSubmit = (evt) => {
    evt.preventDefault();
  }

  handleInputChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value.trim();

    this.setState({
      [name]: {
        value,
        message: '',
      },
    });
  }

  isInputEmpty = (input, value, message) => {
    if (!value.length) {
      this.setState({
        [input]: {
          value,
          message,
        },
      });

      return false;
    }

    return true;
  }

  isLoginUser = (input, value, message, login) => {
    const {users, password} = this.props;
    let isExist = false;

    users.forEach(elem => {
      const {name, password} = elem;

      if (input === 'name') {
        if (name === value) {
          isExist = true;
        }
      }

      if (input === 'password') {
        if (name === login && password === value) {
          isExist = true;
        }
      }
    });

    if (!isExist) {
      this.setState({
        [input]: {
          value,
          message,
        },
      });

      return false;
    }

    return true;
  }

  validateInputs = () => {
    const {name, password} = this.state;
    const {value: nameValue} = name;
    const {value: passwordValue} = password;

    const isNameInputEmpty = this.isInputEmpty('name', nameValue, 'Поле не должно быть пустым');
    const isPasswordInputEmpty = this.isInputEmpty('password', passwordValue, 'Поле не должно быть пустым');
    let isExistName;
    let isExistPassword;

    if (!isNameInputEmpty || !isPasswordInputEmpty) {
      return false;
    }

    isExistName = this.isLoginUser('name', nameValue, 'Такого логина не существует. Пожалуйста, зарегистрируйтесь');

    if (!isExistName) {
      return false;
    }

    isExistPassword = this.isLoginUser('password', passwordValue, 'Неверный пароль', nameValue)

    if (!isExistPassword) {
      return false;
    }

    return true;
  }

  handleButtonClick = (evt) => {
    evt.preventDefault();
    const {changePopupStatus, setUsername, setAuthorizationStatus} = this.props;
    const {name} = this.state;
    const {value: nameValue} = name;
    const isValidate = this.validateInputs();

    if (isValidate) {
      changePopupStatus(false);
      setUsername(nameValue);
      setAuthorizationStatus(AuthorizationStatus.AUTH);

      this.setState({
        name: {
          value: '',
          message: '',
        },
        password: {
          value: '',
          message: '',
        },
      });
    }
  }

  handlePopupClose = (evt) => {
    evt.preventDefault();
    const {changePopupStatus} = this.props;
    const target = evt.target;
    const isOverlay = target.classList.contains('overlay');
    const isButtonClose = target.closest('.login__button-close');

    if (isOverlay || isButtonClose) {
      changePopupStatus(false);

      this.setState({
        name: {
          value: '',
          message: '',
        },
        password: {
          value: '',
          message: '',
        },
      });
    }
  }

  render() {
    const {name, password} = this.state;
    const {value: nameValue, message: nameMessage} = name;
    const {value: passwordValue, message: passwordMessage} = password;

    return (
      <div className="overlay" onClick={this.handlePopupClose}>
        <section className="login">
          <div className="site-wrapper">
            <div className="login__title-wrapper">
              <h2>Форма входа</h2>

              <button className="login__button-close" type="button" onClick={this.handlePopupClose}>
                {/* Icon Component */}
                <CloseIcon />
              </button>
            </div>

            <form className="login__form" action="#" method="POST" onSubmit={this.handleFormSubmit}>
              <div className="login__input-wrapper">
                <label htmlFor="name">Логин</label>
                <input id="name" type="text" value={nameValue} name="name" placeholder="Введите ваш логин" onChange={this.handleInputChange} />

                { nameMessage &&
                  <p className="login__error-message">{nameMessage}</p>
                }
              </div>

              <div className="login__input-wrapper">
                <label htmlFor="password">Пароль</label>
                <input id="password" type="password" value={passwordValue} name="password" placeholder="Введите ваш пароль" onChange={this.handleInputChange} />

                { passwordMessage &&
                  <p className="login__error-message">{passwordMessage}</p>
                }
              </div>

              <button className="login__button" type="submit" onClick={this.handleButtonClick}>Войти</button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: getUsers(state),
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
)(Login);
