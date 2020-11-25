import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {AuthorizationStatus} from "../../js/enums";

const NewsItem = ({elem, index, username, authorizationStatus, deleteNews, approveNews}) => {
  const {title, description, date, status} = elem;

  const newsItemClass = classNames({
    'news__item': true,
    'pending-news': status === 'pending',
  });

  const handleRejectButtonClick = (evt) => {
    evt.preventDefault();
    const newsObject = {
      item: elem,
      index,
    }

    // dispatcher
    deleteNews(newsObject);
  }

  const handleApproveButtonClick = (evt) => {
    evt.preventDefault();
    const updatedNews = {
      ...elem,
      status: 'approved',
    };

    const newsObject = {
      item: updatedNews,
      index,
    }

    // dispatcher
    approveNews(newsObject);
  }

  const renderItem = () => {
    if (status === 'approved' || authorizationStatus === AuthorizationStatus.AUTH) {
      return (
        <li className={newsItemClass}>
          <article className="news__wrapper">
            <div className="news__title-wrapper">
              <h3 className="news__subtitle">{title}</h3>
              <p className="news__data">{date}</p>
            </div>

            <p className="news__description">{description}</p>

            { status === 'pending' &&
              username === 'Admin' &&
              <div className="news__status-wrapper">
                <span>Одобрить новость?</span>

                <button className="news__button-approve" type="button" onClick={handleApproveButtonClick}>
                  {/* Icon component */}
                  <CheckIcon style={{color: 'green'}} />
                </button>

                <button className="news__button-reject" type="button" onClick={handleRejectButtonClick}>
                  {/* Icon component */}
                  <CloseIcon style={{color: 'red'}} />
                </button>
              </div>
            }
          </article>
        </li>
      )
    }

    return null;
  };

  return (
    <React.Fragment>
      {renderItem()}
    </React.Fragment>
  );
};

const NewsItems = ({news, username, authorizationStatus, deleteNews, approveNews}) => {
  return (
    <ul className="news__list">
      { news.length > 0 &&
        news.map((elem, i) =>
          <NewsItem
            // properties
            key={elem.id}
            index={i}
            elem={elem}
            username={username}
            authorizationStatus={authorizationStatus}
            // handlers
            deleteNews={deleteNews}
            approveNews={approveNews}
          />
      )}
    </ul>
  );
};

NewsItem.propTypes = {
  username: PropTypes.string,
  authorizationStatus: PropTypes.string,
  elem: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
  }),
  index: PropTypes.number,
  deleteNews: PropTypes.func,
  approveNews: PropTypes.func,
};

NewsItems.propTypes = {
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
  deleteNews: PropTypes.func,
  approveNews: PropTypes.func,
};

export default NewsItems;
