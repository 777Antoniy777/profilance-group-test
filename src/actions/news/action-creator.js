const NewsActionType = {
  ADD_NEWS: 'ADD_NEWS',
  DELETE_NEWS: 'DELETE_NEWS',
  APPROVE_NEWS: 'APPROVE_NEWS',
};

const NewsActionCreator = {
  addNews: (data) => ({
    type: NewsActionType.ADD_NEWS,
    payload: data,
  }),

  deleteNews: (data) => ({
    type: NewsActionType.DELETE_NEWS,
    payload: data,
  }),
};

export {NewsActionType, NewsActionCreator};
