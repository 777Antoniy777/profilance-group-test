import React from "react";
import {connect} from "react-redux";
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
    filteredNews: this.props.news,
  }

  handleFormSubmit = (evt) => {
    evt.preventDefault();
  }

  handleInputChange = (evt) => {
    const {news} = this.props;
    const target = evt.target;
    const name = target.name;
    const value = target.value.trim();
    let filteredNews;

    if (name === 'search') {
      const searchValue = value.toLowerCase();

      filteredNews = news.filter(elem => {
        const {title} = elem;

        return title.toLowerCase().includes(searchValue);
      });
    }

    if (name === 'search') {
      this.setState({
        [name]: {
          value,
        },
        filteredNews,
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
      const newsObject = {
        item: newsParams,
        index: news.length,
      };
      newsParams.id = news.length + 1;
      newsParams.title = titleValue;
      newsParams.description = descriptionValue;
      newsParams.date = Date.now();
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

  render() {
    const {search, title, description, filteredNews} = this.state;
    const {value: searchValue} = search;
    const {value: titleValue, message: titleMessage} = title;
    const {value: descriptionValue, message: descriptionMessage} = description;

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
          />

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
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  news: getNews(state),
});

const mapDispatchToProps = (dispatch) => ({
  addNews: (data) => {
    dispatch(NewsActionCreator.addNews(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(News);
