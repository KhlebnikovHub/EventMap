import React from "react";
import ReactDOM from "react-dom";
import style from "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";

import Background from './components/Background/Background.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Background />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
