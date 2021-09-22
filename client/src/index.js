import React from "react";
import ReactDOM from "react-dom";
import style from "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import Background from './components/Background/Background.jsx';

import initMetaballs from "metaballs-js";

import image1 from "../src/img/background.jpeg";
import image2 from "../src/img/background2.jpeg";
import image3 from "../src/img/background3.jpeg";
import image4 from "../src/img/background4.jpeg";


const options = {
  numMetaballs: 100,
  minRadius: 1,
  maxRadius: 7.5,
  speed: 10.0,
  color: "#f5f5dc00",
  backgroundColor: "#003e4231",
  useDevicePixelRatio: true,
};

// const cssSelector = document.querySelector("#canvasId");
// initMetaballs(cssSelector, options);




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <Background /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
