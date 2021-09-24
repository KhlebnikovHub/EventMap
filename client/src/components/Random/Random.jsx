import { useEffect } from "react";
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
import { addPlace, getAllPlaces } from "../../redux/actions/places.action";
import AddEvent from "../AddEvent/AddEvent";
import DragPannellum from '../DragPannellum/DragPannellum'
import exifr from "exifr";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { red } from "@mui/material/colors";

// import Drawer from '../Drawer/Drawer.jsx'
import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import style from "./Random.module.css";

import PlaceIcon from '@mui/icons-material/Place';

import "./Random.module.css";
import { getRandomPlaces } from "../../redux/actions/randomPlaces";

const theme = createTheme({
  palette: {
    primary: {
      main: red[300],
    },
  },
});

function createBalloonLayout(ymaps) {
  const BalloonLayout = ymaps?.templateLayoutFactory?.createClass(
    `
    
    <div style="width:50px;height:100px;background-color:black;"></div>
    
  `,
    {}
  );
  return BalloonLayout;
}

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

function Random({userMapId}) {
 // const [state, setState] = React.useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // });
  

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };



  
  const currentUserFromState = useSelector((state) => state.currentuser);
  const user_id = currentUserFromState?.id;



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomPlaces());
  }, []);

  const createHandler = (event) => {
    event.preventDefault();
  };

  let countPlaces = 0;
  

  const [lastAllPlaces, setLastAllPlaces] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [eventAdder, setEventAdder] = useState(false);
  const [myAnchor, setMyAnchor] = useState(null)
  const [lastSelected, setLastSelected] = useState('')
  const [firstCounter, setFirstCounter] = useState(0);
  const [address, setAddress] = useState('')
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [placeEvents, setPlaceEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [state, setState] = useState({ coords: [], right: false, });
  const [myYmaps, setMyYmaps] = useState('');
  const [newCoords, setNewCoords] = useState([]);
  const [ballonstate, setBallonstate] = useState({
    balloonContent: "<h1>Hello! =))</h1>",
  });
  const [ref, setRef] = useState(null);
  let yymap;
  const [imgName, setImgName] = useState();
  const [files, setFiles] = useState();
  const [customState, setCustomState] = useState([]);
  const [clusterState, setClusterState] = useState([]);
  const [newCustom, setNewCustom] = useState([])
  const [supercustom, setSupercustom] = useState({
    template: null,
  });
  let [map, setMap] = useState("");
  const [switcher, setSwitcher] = useState(false);
  const [open, setOpen] = useState(false);
 

  const { list: allPlaces, isLoading, error, lastPlace } = useSelector(
    (state) =>  {
     countPlaces = state.allPlaces.list.length;
     return state.randomPlaces
    }
  );



 

 

  const setClusterIcon = (ymaps) => {
    map?.geoObjects?.each((geoObject) => {
      if (geoObject._clusters) {
        let clusters = geoObject._clusters;
        for (let key in clusters) {
          if (clusters[key]?.clusterObject?.options) {
            const features = clusters[key].hash.features;
            let latestFeature;
            for (let i = 0; i < features.length; i++) {
              const [latitude, longitude] = features[i].geometry.coordinates;
              features[i].date = new Date(
                allPlaces?.find(
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

  const handleApiAvaliable = (ymaps) => {
    let balloonContent = createBalloonLayout(ymaps);
    setBallonstate({ balloonContent: balloonContent });
  };

  const handlerInitMap = () => {
    if (map) {
      // map?.events.add("wheel", setClusterIcon);
      // map?.events.add("boundschange", setClusterIcon);
      map?.events.add("actionend", setClusterIcon);

      if (!firstCounter) {
        map.panTo(map.getCenter());
        setFirstCounter(1)
      }
      map.events.add("balloonopen", function (e) {
        const target = e.get('target');
        if (target) {
          const data = target?.balloon?._captor?._data?.properties?._data;
          if (switcher) {
            setSelectedOrganization(data);
            if (data?.point) {
              let coords = [data?.point[1], data?.point[0]];
              setNewCoords(coords);
             
            }
          }
        }
      });



    }
  };



    const createTemplateLayoutFactory = (ymaps) => {

    

    if(!yymap) {
      yymap = myYmaps;
    }
    // && !customState?.template || ymaps && !supercustom?.template
    if (allPlaces.length) {
      for (let i = 0; i < allPlaces?.length; i++) {
        
          setCustomState((prev) => [
            ...prev,
            {
              id: allPlaces[i]?.id,
              coordinates: [+allPlaces[i].latitude, +allPlaces[i].longitude],
              template: yymap?.templateLayoutFactory?.createClass(
                `<div class="place__card">
                
                        <img width="100px" height="auto" src="${process.env.REACT_APP_API_URL}${allPlaces[i]?.Events[0]?.image}">
                  
                
                </div>`
              ),
            },
          ]);

          setClusterState((prev) => [
            ...prev,
            {
              coordinates: [+allPlaces[i].latitude, +allPlaces[i].longitude],
              template: yymap?.templateLayoutFactory?.createClass(
                `

                      <img width="100" height="80" src="${process.env.REACT_APP_API_URL}${allPlaces[i]?.Events[0]?.image}">

                
              `
              ),
            },
          ]);
        

      }

     
    } else {

    }


    setSupercustom({
      template: yymap?.templateLayoutFactory?.createClass(
        `
              
        <h2>Здесь будет ваше новое событие!))</h2>
  
            `
      ),
    });


  };


useEffect(() => {
  
  if(lastPlace) {
    createTemplateLayoutFactory();
    setTimeout(() => {
    }, 100)
  }
  
  
 
 
}, [lastPlace])
  

  const polyline = createRef(null);

  const onMapClick = async (event) => {
    if (switcher) {
      try {
        setState((state) => {
          return {
            coords: [...state?.coords, event?.get("coords")],
          };
        });

        if(event?.get("coords")) {
          setNewCoords(event?.get("coords"));
        }

        let response = await myYmaps?.geocode(event?.get("coords"));

        setAddress(response?.geoObjects.get(0)?.properties?._data?.text);

        // myYmaps?.geocode(newCoords).then(res => {
        //   setAddress(res?.geoObjects.get(0)?.properties?._data?.text)
        //   handleOpen();
        // })

      } catch (error) {
        console.log(error);
      }
    }
  };




  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : '25vw' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {placeEvents.map((event) => (
          <>
            <div className={style.drawer}>


              <button>панорама блядь</button>
            

            <p>{event?.name}</p>
            <Divider />
            <p>{event?.description}</p>
            <img className={style.drawer__image} src={`${process.env.REACT_APP_API_URL}${event?.image}`} alt="eventmap"/>

            <div className={style.drag}>
              <DragPannellum {...event}/>


            </div>
            </div>
          </>
        ))}

      </List>

    </Box>
  );
  return (
  <>
    {["right"].map((anchor) => (
<React.Fragment key={anchor}>
    
    <div className={style.events__map}>
                  {/* <Drawer /> */}
    

      <YMaps
      query={{
          apikey: "ca6c950f-dbfc-4b92-9866-e35c7b2be031&lang=ru_RU",
        }}
        version={"2.1"}
      >
        <div>
          My awesome application with maps!
          {/* className={style.events__map} */}
        
            <div >
            {/* className={style.events__mapWrapper} */}
              <Map
                className={style.events__map}
                instanceRef={(ref) => {
                  setMap(ref);
                  handlerInitMap();

                }}
                onLoad={(ymaps) => {
                  if(!yymap) {
                    yymap = ymaps;
                  }
                
                  
                  setMyYmaps(ymaps);
                 setTimeout(() => {
                   createTemplateLayoutFactory(yymap);
                 }, 100)
                  
                  handleApiAvaliable(ymaps);

                  setClusterIcon(ymaps.map);

                }}
                modules={["templateLayoutFactory", "layout.ImageWithContent", "geolocation", "geocode"]}
                defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                onClick={(event) => {
                  try {
                    if (event?.get("coords")) {
                  
                      onMapClick(event);
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <Clusterer
                  options={{
                   
                    iconImageSize: [0, 0], // размер нашей картинки
                    clusterIconLayout: "default#imageWithContent",
                    iconShape: {
                      type: "Rectangle",
                      coordinates: [
                        [-50, -50],
                        [100, 100],
                      ],
                    },

                   
                  }}
                  >
                  {allPlaces?.map((place, index) => (
                    <Placemark
                      onClick={() => {                                           
                        setPlaceEvents(place?.Events)
                        setNewCoords([+place?.latitude, +place?.longitude])
                        setTimeout(
                          toggleDrawer(anchor, true), 100)
                      }    
                      }
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
                        //  customState[index]?.template
                        iconContentLayout: customState?.find(oneCustom => {
                          if(oneCustom.id == place.id) {
                            return true;
                          }
                           })?.template,
                        iconContentSize: [70, 70],
                        iconContentOffset: [-30, -90],

                        iconImageHref:
                          "https://i.ibb.co/zJwrByk/ssssss-01.png",
                        hideIconOnBalloonOpen: false, 
// POINTT
                        balloonContentLayout: ballonstate.balloonContent,
                        balloonPanelMaxMapArea: 1,
                        openEmptyBalloon: true,
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
                    >
                      {anchor}
                    </Placemark>
                  ))}
                </Clusterer>        
                      
              </Map>
{/* ДРОВЕР */}
              <div>
                {/* {placeEvents.map((event) => (
                  <>
                    <p>{event?.name}</p>
                    <p>{event?.description}</p>
                  </>
                ))} */}
                {/* <Drawer /> */}
              </div>
              {/* <div>
                <p>Адрес: {address}</p>
                Вы выбрали место:
                <p>{selectedOrganization?.name}</p>
                <p>{selectedOrganization?.description}</p>
                <p>{selectedOrganization?.workingTime}</p>
                <p>Координаты: {newCoords}</p>
              </div> */}
           
            </div>
         
        </div>
      </YMaps>
           
                
    </div>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
    ))}
      </>
  );
}

export default Random












