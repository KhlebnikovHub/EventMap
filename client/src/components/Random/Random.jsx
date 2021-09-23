import React, { useEffect } from "react";
import {
  YMaps,
  Map,
  Clusterer,
  FullscreenControl,
  SearchControl,
  Placemark,
  ObjectManager,
} from "react-yandex-maps";
import { createRef, useState } from "react";
import style from "./Random.module.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from "react-redux";
import AddEvent from "../AddEvent/AddEvent";
import exifr from "exifr";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { red } from "@mui/material/colors";
import { getRandomPlaces } from "../../redux/actions/randomPlaces";

const theme = createTheme({
  palette: {
    primary: {
      main: red[300],
    },
  },
});


const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Random() {
  const currentUserFromState = useSelector((state) => state.currentuser);
  const user_id = currentUserFromState?.id;

  const { list: randomPlaces, isLoading, error } = useSelector(
    (state) => state.randomPlaces
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomPlaces())
  }, []);

  const createHandler = (event) => {
    event.preventDefault();
  };


  const [firstCounter, setFirstCounter] = useState(0);
  const [address, setAddress] = useState('')
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [placeEvents, setPlaceEvents] = useState([]);
  const [myYmaps, setMyYmaps] = useState('');
  const [newCoords, setNewCoords] = useState([]);
  const [ref, setRef] = useState(null);
  const [customState, setCustomState] = useState([]);
  const [clusterState, setClusterState] = useState([]);

  const [supercustom, setSupercustom] = useState({
    template: null,
  });
  let [map, setMap] = useState("");
  let yymap;
  const [switcher, setSwitcher] = useState(false);
  const [open, setOpen] = useState(false);
  

  const onSwitcher = () => {
    setSwitcher((prev) => !prev);
  };

  const setClusterIcon = (ymaps) => {
    console.log(map);
    map?.geoObjects?.each((geoObject) => {
      if (geoObject._clusters) {
        console.log("geoOBJECT", geoObject);
        let clusters = geoObject._clusters;
        for (let key in clusters) {
          console.log("CLUSTERYAGA", key, clusters[key]);
          if (clusters[key]?.clusterObject?.options) {
            const features = clusters[key].hash.features;
            let latestFeature;
            for (let i = 0; i < features.length; i++) {
              const [latitude, longitude] = features[i].geometry.coordinates;
              features[i].date = new Date(
                randomPlaces?.find(
                  (el) =>
                    +el.latitude === latitude && +el.longitude === longitude
                )?.Events[0]?.createdAt
              );
            }
            latestFeature = features[0];
            for (let i = 1; i < features.length; i++) {
              latestFeature =
                features[i].date.getTime() > latestFeature.date.getTime()
                  ? features[i]
                  : latestFeature;
            }

            console.log("LATEEEEESSSST FEAAATUUUUURE", latestFeature);

            let latestFeatureCoordinates = latestFeature.geometry.coordinates;
            const latestIndexTemplate = customState.findIndex((el) => {
              const [latestLatitude, latestLongitude] = latestFeatureCoordinates;
              const [elLatitude, elLongitude] = el.coordinates;
              return (
                latestLatitude === elLatitude && latestLongitude === elLongitude
              );
            });

            clusters[key]?.clusterObject?.options.set(
              "clusterIconContentLayout",
              clusterState[latestIndexTemplate]?.template
            );
          }
        }
      }
    })



  }


  const handlerInitMap = () => {
    if (map) {
      // map?.events.add("wheel", setClusterIcon);
      // map?.events.add("boundschange", setClusterIcon);
      map?.events.add("actionend", setClusterIcon);
  
      if (!firstCounter) {
        map.panTo(map.getCenter());
        setFirstCounter(1)
      }
      
    }
  };

  const createTemplateLayoutFactory = (ymaps) => {
    console.log("YMAMAMAP", ymaps);
    // && !customState?.template || ymaps && !supercustom?.template
    if (ymaps && randomPlaces.length) {
      for (let i = 0; i < randomPlaces?.length; i++) {
        // console.log(randomPlaces[i]?.Events[0]?.image);
        console.log("I'm from SUPERYMAPS! =))");
        if (randomPlaces.length) {
          setCustomState((prev) => [
            ...prev,
            {
              coordinates: [+randomPlaces[i].latitude, +randomPlaces[i].longitude],
              template: ymaps?.templateLayoutFactory?.createClass(
                `
                    <div class="card">
                      <div class="card-image">
                        <img width="100px" height="auto" src="${process.env.REACT_APP_API_URL}${randomPlaces[i]?.Events[0]?.image}">
                      </div>
                    </div>
                  
                `
              ),
            },
          ]);

          setClusterState((prev) => [
            ...prev,
            {
              coordinates: [+randomPlaces[i].latitude, +randomPlaces[i].longitude],
              template: ymaps?.templateLayoutFactory?.createClass(
                `
                  <div class="card">
                    <div class="card-image">
                      <img width="100" height="80" src="${process.env.REACT_APP_API_URL}${randomPlaces[i]?.Events[0]?.image}">
                    </div>
                  </div>
                
              `
              ),
            },
          ]);
        }



      }

      console.log("CUSTOM STATE", customState);
      setSupercustom({
        template: ymaps?.templateLayoutFactory?.createClass(
          `
                
          <h2>Здесь будет ваше новое событие!))</h2>
    
              `
        ),
      });
    }
  };



  // useEffect(() => {
  // console.log('GPS', newCoords)

  // }, [newCoords]);

  return (
    <div className="App">
     

      <YMaps
        onLoad={ymaps => {
          // ref.geocode([55, 37]).then(res => console.log("POPPPPER MOPPPER", res.geoObjects.get(0)))


        }
        }
        onClick={(event) => console.log("YYYYYYMAAAAAAP", event.target)}
        query={{
          apikey: "ca6c950f-dbfc-4b92-9866-e35c7b2be031&lang=ru_RU",
        }}
        version={"2.1"}
      >
        <div>
          My awesome application with maps!
         
            <div className={style.events__mapWrapper}>
              <Map
                className={style.events__map}
                instanceRef={(ref) => {
                  setMap(ref);
                  handlerInitMap();

                }}
                onLoad={(ymaps) => {
                  yymap = ymaps;
                  console.log("CENTEEEEEEEEEEEEER", ymaps?.map?.getCenter());
                  setMyYmaps(ymaps);
                  createTemplateLayoutFactory(ymaps);             
                  setClusterIcon(ymaps.map);

                }}
                modules={["templateLayoutFactory", "layout.ImageWithContent", "geolocation", "geocode"]}
                defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                
              >
                <Clusterer
                  options={{
                    // preset: 'islands#invertedVioletClusterIcons',
                    iconImageSize: [0, 0], // размер нашей картинки
                    clusterIconLayout: "default#imageWithContent",

                    // clusterIconImageHref: 'http://s49novouralsk.edusite.ru/images/knopka.png',
                    // clusterIconContentLayout: customState[0].template,

                    // clusterIconContentLayout: customState.template,
                    // iconContentSize: [100,100],

                    // clusterIcons: [
                    //   {
                    //     href: 'data:image/png;base64,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',
                    //     size: [40, 40],
                    //     offset: [0, 10]
                    //   },
                    //   {
                    //     href: 'https://cdn4.vectorstock.com/i/1000x1000/20/73/black-cat-icon-flat-vector-11112073.jpg',
                    //     size: [60, 60],
                    //     offset: [-30, -30]
                    //   }],

                    iconShape: {
                      type: "Rectangle",
                      // Прямоугольник описывается в виде двух точек - верхней левой и нижней правой.
                      coordinates: [
                        [-50, -50],
                        [100, 100],
                      ],
                    },

                 
                  }}
                >
                  {randomPlaces?.map((place, index) => (
                    <Placemark
                      onClick={() => setPlaceEvents(place?.Events)}
                      className="round"
                      key={Math.round(Math.random() * 11532)}
                      geometry={[+place?.latitude, +place?.longitude]}
                      options={{
                        // iconLayout: 'default#image',
                        iconImageSize: [40, 40], // размер нашей картинки
                        iconLayout: "default#imageWithContent",

                        iconShape: {
                          type: "Rectangle",
                          // Прямоугольник описывается в виде двух точек - верхней левой и нижней правой.
                          coordinates: [
                            [-50, -50],
                            [100, 100],
                          ],
                        },

                        iconContentLayout: customState[index]?.template ? customState[index]?.template : supercustom?.template,
                        iconContentSize: [70, 70],
                        iconContentOffset: [-30, -90],

                        iconImageHref:
                          "http://s49novouralsk.edusite.ru/images/knopka.png",
                    
                      }}
                      modules={[
                        "geoObject.addon.balloon",
                        "geoObject.addon.hint",
                      ]}

                      properties={
                        {
                          // iconCaption : 'asd'
                        }
                      }
                    />
                  ))}
                </Clusterer>

           
                <FullscreenControl />
                
              </Map>

              <div>
                {placeEvents.map((event) => (
                  <>
                    <p>{event?.name}</p>
                    <p>{event?.description}</p>
                  </>
                ))}
              </div>
              <div>
                <p>Адрес: {address}</p>
                Вы выбрали место:
                <p>{selectedOrganization?.name}</p>
                <p>{selectedOrganization?.description}</p>
                <p>{selectedOrganization?.workingTime}</p>
                <p>Координаты: {newCoords}</p>
              </div>
            </div>
          
        </div>
      </YMaps>
     
    </div>
  );
}

export default Random;