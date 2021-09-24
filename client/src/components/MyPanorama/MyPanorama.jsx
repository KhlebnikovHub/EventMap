import { Pannellum } from "pannellum-react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import image from '../../img/IMG_2505.JPG'
import { getPanorama } from "../../redux/actions/panorama.action";

function MyPanorama() {

  const [panoram, setPanoram] = useState({ panorama: null });

  const dispatch = useDispatch();

  

  const { id } = useParams()
  

  const { panorama, isLoading, error } = useSelector((state) => {
    console.log("PISYAPOPA", state.panorama);
    
    return state.panorama });

  useEffect(() => {
    dispatch(getPanorama(id));
  }, [])
   
  
  

  return (
    <Pannellum
        width="100%"
        height="1000px"
        //URL={`${process.env.REACT_APP_API_URL}${panoram.panorama}`}
        image={`${process.env.REACT_APP_API_URL}${panorama?.panorama}`}
        autoLoad
      >  
      </Pannellum>
  )
}

export default MyPanorama;


// https://lh3.googleusercontent.com/proxy/bQi40VnbSEKURyQRf_49gcH7rQpSfWH31hO3Js51oXOD-dOldS2IXWSxJqwPb8XbV9WtrQlwMJeWnEmVvo5DvzookGa9IxxyY31dujYWjPsSmReH_THCFA
