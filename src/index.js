import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store/store";
import {Provider} from "react-redux";
import "@/styles/main.scss";
import App from "./components/app/app";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
