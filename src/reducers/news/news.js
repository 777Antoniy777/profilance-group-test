import {NewsActionType} from "../../actions/news/action-creator";
import {deleteItem, addItem} from "../../actions/action-helpers";

const initialState = {
  news: [
    {
      id: 1,
      status: 'approved',
      title: 'Чтобы избавиться от короновируса нужно лишь..',
      description: 'Потеря вкуса и обоняния первые симптомы.',
      date: '24.11.2020',
    },
    {
      id: 2,
      status: 'approved',
      title: 'Котика смогли спасти с дерева',
      description: 'Мы взяли интервью у неравнодушного гражданина',
      date: '24.11.2020',
    },
  ],
};

export default function createState(state = initialState, action) {
  switch (action.type) {
    case NewsActionType.ADD_NEWS:
      return {
        ...state,
        news: addItem(state.news, action.payload),
      };

    case NewsActionType.DELETE_NEWS:
      return {
        ...state,
        news: deleteItem(state.news, action.payload),
      };

    default:
      return state;
  }
}
