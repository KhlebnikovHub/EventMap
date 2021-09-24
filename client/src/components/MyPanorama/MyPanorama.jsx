import { Pannellum } from "pannellum-react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import image from '../../img/IMG_2505.JPG'

function MyPanorama() {

  const [panoram, setPanoram] = useState();

  const { id } = useParams()
  console.log('panorama', id)

  
    fetch(`${process.env.REACT_APP_API_URL}/panorama/${id}`)
      .then(res => res.json())
      .then(pan => setPanoram(pan))
  
  

  return (
    <Pannellum
        width="100%"
        height="1000px"
        //URL={`${process.env.REACT_APP_API_URL}${panoram.panorama}`}
        image={'https://lh3.googleusercontent.com/proxy/bQi40VnbSEKURyQRf_49gcH7rQpSfWH31hO3Js51oXOD-dOldS2IXWSxJqwPb8XbV9WtrQlwMJeWnEmVvo5DvzookGa9IxxyY31dujYWjPsSmReH_THCFA'}
        autoLoad
      >  
      </Pannellum>
  )
}

export default MyPanorama;
