import React from "react";
import {connect} from "react-redux";
import CloseIcon from '@material-ui/icons/Close';
import {getPopupStatus} from "../../selectors/popup/selectors";
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

  handleButtonClick = (evt) => {
    const {name, password} = this.state;
    const {value: nameValue} = name;
    const {value: passwordValue} = password;
    evt.preventDefault();


  }

  handlePopupClose = (evt) => {
    evt.preventDefault();
    const {changePopupStatus} = this.props;
    const target = evt.target;
    const isOverlay = target.classList.contains('overlay');
    const isButtonClose = target.closest('.login__button-close');

    if (isOverlay || isButtonClose) {
      changePopupStatus(false);
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
  popupStatus: getPopupStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  changePopupStatus: (status) => {
    dispatch(PopupActionCreator.changePopupStatus(status));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
