import { useEffect, useRef, useState } from "react";
import style from "./Background.module.css";
import initMetaballs from "metaballs-js";
import image1 from "../../img/background.jpeg";
import image2 from "../../img/background2.jpeg";
import image3 from "../../img/background3.jpeg";
import image4 from "../../img/background4.jpeg";
import BackgroundSlider from "react-background-slider";
import { useAnimationContext } from "../../context/themeContext";
const options = {
  numMetaballs: 100,
  minRadius: 1,
  maxRadius: 7.5,
  speed: 10.0,
  color: "#f5f5dc00",
  backgroundColor: "#003e4231",
  useDevicePixelRatio: true,
};
const optionsOff = {
  numMetaballs: 1,
  minRadius: 0.0001,
  maxRadius: 0.0001,
  speed: 0,
  color: "#f5f5dc00",
  backgroundColor: "#003e4231",
  useDevicePixelRatio: true,
};
function Background() {
  const canvasEl = useRef(null)

  const {switchAnimation} = useAnimationContext()

  useEffect(() => {
   initMetaballs(canvasEl.current, options);
}, [])

  return (
  <div className={style.background__image}>
    { switchAnimation ?
     <canvas ref={canvasEl} className={style.canvas__wrapper} id="canvasId"></canvas>
    :
    <canvas ref={canvasEl} className={style.canvas__wrapper} id="canvasId" hidden></canvas>
  }
    <BackgroundSlider
      images={[image1, image2, image3, image4]}
      duration={7}
      transition={2}
    />
  </div>
);
}
export default Background;
