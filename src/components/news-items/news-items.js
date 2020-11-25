import React from "react";

const NewsItem = ({elem}) => {
  const {title, description, date} = elem;

  return (
    <li className="news__item">
      <article className="news__wrapper">
        <div className="news__title-wrapper">
          <h3 className="news__subtitle">{title}</h3>
          <p className="news__data">{date}</p>
        </div>

        <p className="news__description">{description}</p>
      </article>
    </li>
  );
};

const NewsItems = ({news}) => {
  return (
    <ul className="news__list">
      { news.length > 0 &&
        news.map(elem =>
          <NewsItem
            // properties
            key={elem.id}
            elem={elem}
          />
      )}
    </ul>
  );
};

export default NewsItems;
