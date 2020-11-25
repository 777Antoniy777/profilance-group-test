import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../js/enums";
import {getUsername, getAuthorizationStatus} from "../../selectors/user/selectors";
import {getNews} from "../../selectors/news/selectors";
import {NewsActionCreator} from "../../actions/news/action-creator";
import NewsItems from "../news-items/news-items";
class News extends React.PureComponent {
  state = {
    search: {
      value: '',
    },
    title: {
      value: '',
      message: '',
    },
    description: {
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

    if (name === 'search') {
      this.setState({
        [name]: {
          value,
        },
      });
    } else {
      this.setState({
        [name]: {
          value,
          message: '',
        }
      });
    }
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

  validateInputs = () => {
    const {title, description} = this.state;
    const {value: titleValue} = title;
    const {value: descriptionValue} = description;

    const isTitleInputEmpty = this.isInputEmpty('title', titleValue, 'Поле не должно быть пустым');
    const isDescriptionInputEmpty = this.isInputEmpty('description', descriptionValue, 'Поле не должно быть пустым');

    if (!isTitleInputEmpty || !isDescriptionInputEmpty) {
      return false;
    }

    return true;
  }

  handleButtonClick = (evt) => {
    evt.preventDefault();
    const {news, addNews} = this.props;
    const {title, description} = this.state;
    const {value: titleValue} = title;
    const {value: descriptionValue} = description;
    const isValidate = this.validateInputs();
    const newsParams = {};

    if (isValidate) {
      const date = new Date();
      const newsObject = {
        item: newsParams,
        index: news.length,
      };
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      newsParams.id = news[news.length - 1].id + 1;
      newsParams.title = titleValue;
      newsParams.description = descriptionValue;
      newsParams.date = `${day}.${month}.${year}`;
      newsParams.status = 'pending';

      // dispatcher
      addNews(newsObject);

      this.setState({
        title: {
          value: '',
          message: '',
        },
        description: {
          value: '',
          message: '',
        },
      });
    }
  }

  filterNews = () => {
    const {news} = this.props;
    const {search} = this.state;
    let {value: searchValue} = search;

    searchValue = searchValue.toLowerCase();
    const filteredNews = news.filter(elem => {
      const {title} = elem;

      return title.toLowerCase().includes(searchValue);
    });

    return filteredNews;
  }

  render() {
    const {username, authorizationStatus, deleteNews, approveNews} = this.props;
    const {search, title, description} = this.state;
    const {value: searchValue} = search;
    const {value: titleValue, message: titleMessage} = title;
    const {value: descriptionValue, message: descriptionMessage} = description;
    const filteredNews = this.filterNews();

    return (
      <section className="news">
        <div className="site-wrapper">
          <h2>Наши новости</h2>

          <div className="news__search-form-wrapper">
            <form className="news__search-form" method="GET">
              <div className="news__input-wrapper">
                <label htmlFor="search">Найти новость:</label>
                <input id="search" type="search" value={searchValue} name="search" placeholder="Введите текст" onChange={this.handleInputChange} />
              </div>
            </form>
          </div>

          <NewsItems
            // properties
            news={filteredNews}
            username={username}
            authorizationStatus={authorizationStatus}
            // handlers
            deleteNews={deleteNews}
            approveNews={approveNews}
          />

          { authorizationStatus === AuthorizationStatus.AUTH &&
            username !== 'Admin' &&
            <div className="news__form-wrapper">
              <form className="news__form" action="#" method="POST" onSubmit={this.handleFormSubmit}>
                <div className="news__input-wrapper">
                  <label htmlFor="title">Название новости:</label>
                  <input id="title" type="text" value={titleValue} name="title" placeholder="Введите заголовок" onChange={this.handleInputChange} />

                  { titleMessage &&
                    <p className="news__error-message">{titleMessage}</p>
                  }
                </div>

                <div className="news__input-wrapper">
                  <label htmlFor="description">Описание новости:</label>
                  <textarea id="description" type="text" value={descriptionValue} name="description" placeholder="Введите описание" onChange={this.handleInputChange}></textarea>

                  { descriptionMessage &&
                    <p className="news__error-message">{descriptionMessage}</p>
                  }
                </div>

                <button className="news__button" type="submit" onClick={this.handleButtonClick}>Отправить</button>
              </form>
            </div>
          }
        </div>
      </section>
    );
  }
}

News.propTypes = {
  username: PropTypes.string,
  authorizationStatus: PropTypes.string,
  news: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      status: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string,
    }),
  ),
  addNews: PropTypes.func,
  deleteNews: PropTypes.func,
  approveNews: PropTypes.func,
};

const mapStateToProps = (state) => ({
  username: getUsername(state),
  authorizationStatus: getAuthorizationStatus(state),
  news: getNews(state),
});

const mapDispatchToProps = (dispatch) => ({
  addNews: (data) => {
    dispatch(NewsActionCreator.addNews(data));
  },
  deleteNews: (data) => {
    dispatch(NewsActionCreator.deleteNews(data));
  },
  approveNews: (data) => {
    dispatch(NewsActionCreator.approveNews(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(News);
