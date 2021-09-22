import React from "react";
import ReactDOM from "react-dom";
import style from "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";

import initMetaballs from "metaballs-js";

import image1 from "../src/img/background.jpeg";
import image2 from "../src/img/background2.jpeg";
import image3 from "../src/img/background3.jpeg";
import image4 from "../src/img/background4.jpeg";

import BackgroundSlider from "react-background-slider";

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
      <div className={style.background__image}>
        <BackgroundSlider
          images={[image1, image2, image3, image4]}
          duration={7}
          transition={2}
        />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
