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
import { addPlace, deleteEvent, getAllPlaces } from "../../redux/actions/places.action";
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
import style from "./Events.module.css";

import PlaceIcon from '@mui/icons-material/Place';

import "./Events.module.css";
import { Link } from "react-router-dom";

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

function Events() {

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
    dispatch(getAllPlaces(user_id));
  }, []);

  const createHandler = (event) => {
    event.preventDefault();
  };

  const deleteEventHandler = (id) => {
    dispatch(deleteEvent(id))
  }

  let countPlaces = 0;

  const [place, setPlace] = useState('')
  const [lastAllPlaces, setLastAllPlaces] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    (state) => {
      countPlaces = state?.allPlaces?.list?.length;
      return state?.allPlaces
    }
  );



  const handleOpen = () => {

    setOpen(true);
    // map.panTo(newCoords ? newCoords : map?.getCenter());

  };
  const handleClose = () => {
    map.panTo(map.getCenter());
    setOpen(false);
  };

  const onSwitcher = () => {
    map.panTo(map.getCenter());
    setSwitcher((prev) => !prev);
  };

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
              handleOpen();
            }
          }
        }
      });



    }
  };


  const createTemplateLayoutFactory = (ymaps) => {



    if (!yymap) {
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
              `
                
                        <img width="auto" height="100px" src="${process.env.REACT_APP_API_URL}${allPlaces[i]?.Events[0]?.image}">
                  
                
               `
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
              
        <h2>?????????? ?????????? ???????? ?????????? ??????????????!))</h2>
  
            `
      ),
    });


  };


  useEffect(() => {
    if (lastPlace) {
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

        if (event?.get("coords")) {
          setNewCoords(event?.get("coords"));
        }

        let response = await myYmaps?.geocode(event?.get("coords"));

        setAddress(response?.geoObjects.get(0)?.properties?._data?.text);
        // map?.panTo(newCoords);
        setPlace(null); 
        handleOpen();


      } catch (error) {
        console.log("ERRRRRRRRORRRRR", error);
      }
    }
  };


  const [openSnack, setOpenSnack] = useState(false);
  const [transition, setTransition] = useState(undefined);

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleOpenSnack = (Transition) => {
    setTransition(() => Transition);
    setOpenSnack(true);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const dragStartHandler = (event) => {
    event.preventDefault();
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault();
  };

  let imgCoord = [];
  const dropHandler = async (event) => {
    event.preventDefault()
    try {
      if (switcher) {
        let fileDrag = event.dataTransfer.files[0];
        setFiles(event.dataTransfer.files);
        setImgName(event.dataTransfer.files[0].name);
        imgCoord = await exifr.gps(fileDrag);
        if (imgCoord) {
          setNewCoords([imgCoord?.latitude, imgCoord?.longitude]);
          map?.panTo([imgCoord?.latitude, imgCoord?.longitude], { duration: 2000, flying: true });
          myYmaps?.geocode([imgCoord?.latitude, imgCoord?.longitude]).then(res => {
            setAddress(res?.geoObjects.get(0)?.properties?._data?.text)
          })
          setTimeout(() => {
            handleOpen()
          }, 2000);
        } else {
          handleOpenSnack(TransitionLeft)
        }
      }

    } catch (error) {
      console.log(error);
    }
  };


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : '25vw' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={style.drag}>
        <DragPannellum id={placeEvents[0]?.place_id} />
      </div>


      <button><Link target="_blank" rel="noopener noreferrer" to={`/panorama/${placeEvents[0]?.place_id}`}>?????????????? ????????????????</Link></button>

      <button onClick={() => {
        toggleDrawer(anchor, true);
        handleOpen();
        }}>?????????????? ??????????????</button>
      <List>
        {placeEvents.map((event) => (
          <>
            <div className={style.drawer}>

            <p>{event?.name}</p>
            <Divider />
            <p>{event?.description}</p>
            <img className={style.drawer__image} src={`${process.env.REACT_APP_API_URL}${event?.image}`} alt="eventmap"/>


              <DragPannellum {...event} />

              <p>{event?.name}</p>
              <Divider />
              <p>{event?.description}</p>
              <img className={style.drawer__image} src={`${process.env.REACT_APP_API_URL}${event?.image}`} alt="eventmap" />

              <button onClick={() => deleteEventHandler(event.id)}>?????????????? ??????????</button>
              <button><Link to={`/Event/${event.id}`} >???????????????????? ??????????????</Link></button>
              <div className={style.drag}>

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

          <div
            className="App"
            onClick={(event) => {
              let geoObjectsArray = search?.getResultsArray();
              const selectedIndex = search?.getSelectedIndex();
              let selectedPlace = geoObjectsArray[selectedIndex];
              if (selectedPlace && switcher) {
                setSelectedOrganization(selectedPlace?.properties?._data);
                setNewCoords(selectedPlace?.geometry?._coordinates);
                setLastSelected(selectedPlace);
                if (!open && selectedPlace != lastSelected) {
                  handleOpen();
                }
              }
            }}
          >
            {/* <Drawer /> */}
            <div>
              <div>
                <FormGroup>
                  <FormControlLabel
                    className={style.events__modalButton}
                    // control={<Switch defaultChecked />}
                    control={<Switch />}
                    label="?????????? ????????????????"
                    // onClick={onSwitcher, toggleDrawer(anchor, true)}
                    //   />
                    //             {anchor}

                    onClick={onSwitcher}
                  />

                  {/* <FormControlLabel 
                          className={style.events__modalButton}
                          label="?????????? ????????????????"
              onClick={onSwitcher}
              disabled control={<Switch />}
              label="Disabled" /> */}
                </FormGroup>

              </div>
              {/* <Button onClick={handleOpen} className={style.events__modalButton}>Open modal</Button> */}
              <Modal
                className={style.events__modalWrapper}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => { handleClose(); setNewCoords([]) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box sx={modalStyle}>
                    <AddEvent
                      place={place}
                      placeEvents={placeEvents}
                      handleClose={handleClose}
                      setNewCoords={setNewCoords}
                      newCoords={newCoords}
                      address={address}
                      selectedOrganization={selectedOrganization}
                      setImgName={setImgName}
                      files={files}
                      address={address}
                      selectedOrganization={selectedOrganization}
                    />
                  </Box>
                </Fade>
              </Modal>
            </div>

            <YMaps
              query={{
                apikey: "ca6c950f-dbfc-4b92-9866-e35c7b2be031&lang=ru_RU",
              }}
              version={"2.1"}
            >
              <div>
                My awesome application with maps!
                <div

                  name="img"
                  onDragStart={(e) => dragStartHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragOver={(e) => dragStartHandler(e)}
                  onDrop={dropHandler}
                >
                  <div className={style.events__mapWrapper}>
                    <Map
                      className={style.events__map}
                      instanceRef={(ref) => {
                        setMap(ref);
                        handlerInitMap();

                      }}
                      onLoad={(ymaps) => {
                        if (!yymap) {
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
                          console.log("ERRORRRRR", error);
                        }
                      }}
                    >
                      <Clusterer
                     
                        options={{
                          // preset: 'islands#invertedVioletClusterIcons',
                          iconImageSize: [0, 0], // ???????????? ?????????? ????????????????
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
                            coordinates: [
                              [-50, -50],
                              [100, 100],
                            ],
                          },

                          // clusterDisableClickZoom: true,
                          // clusterHideIconOnBalloonOpen: false,
                          // geoObjectHideIconOnBalloonOpen: false
                        }}
                      >
                        {allPlaces?.map((place, index) => (
                          <Placemark
                            onClick={() => {
                              setPlaceEvents(place?.Events)
                              setPlace(place);
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
                              iconImageSize: [40, 40], // ???????????? ?????????? ????????????????
                              iconLayout: "default#imageWithContent",

                              iconShape: {
                                type: "Rectangle",
                                // ?????????????????????????? ?????????????????????? ?? ???????? ???????? ?????????? - ?????????????? ?????????? ?? ???????????? ????????????.
                                coordinates: [
                                  [-50, -50],
                                  [100, 100],
                                ],
                              },
                              //  customState[index]?.template
                              iconContentLayout: customState?.find(oneCustom => {
                                if (oneCustom.id == place.id) {
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



                      {/* // ?????????? ?????? ???????????????? ???????????? ??????????????  */}
                      {open &&
                        <><Placemark
                          geometry={newCoords}
                          options={{
                            iconImageSize: [40, 40], // ???????????? ?????????? ????????????????
                            iconLayout: "default#imageWithContent",

                            iconShape: {
                              type: "Rectangle",
                              // ?????????????????????????? ?????????????????????? ?? ???????? ???????? ?????????? - ?????????????? ?????????? ?? ???????????? ????????????.
                              coordinates: [
                                [-50, -50],
                                [100, 100],
                              ],
                            },

                            iconContentLayout: supercustom?.template,
                            iconContentSize: [200, 200],
                            iconContentOffset: [-30, -90],

                            iconImageHref:
                              "https://i.ibb.co/zJwrByk/ssssss-01.png",
                          }}
                        /></>}
                      <FullscreenControl />
                      <SearchControl
                        instanceRef={(ref) => {
                          if (ref) {
                            setSearch(ref);
                          }
                        }}
                        options={{
                          provider: "yandex#search",
                          position: {
                            top: 50,
                            left: 278
                          },
                        }}
                      />
                    </Map>
                    {/* ???????????? */}
                    <div>
                      {/* {placeEvents.map((event) => (
                  <>
                    <p>{event?.name}</p>
                    <p>{event?.description}</p>
                  </>
                ))} */}
                      {/* <Drawer /> */}
                    </div>
                    <div>
                      <p>??????????: {address}</p>
                      ???? ?????????????? ??????????:
                      <p>{selectedOrganization?.name}</p>
                      <p>{selectedOrganization?.description}</p>
                      <p>{selectedOrganization?.workingTime}</p>
                      <p>????????????????????: {newCoords}</p>
                    </div>
                    <button onClick={() => setDrawerOpen(prev => !prev)}>??????????????</button>
                  </div>
                </div>
              </div>
            </YMaps>

            <Snackbar
              open={openSnack}
              onClose={handleCloseSnack}
              TransitionComponent={transition}
              message="???????????????????? ???????????????????? ???????????????????? ???? ????????, ???????????????? ???? ?????????? ?? ???????????????? ?????????? ?? ????????????"
              key={transition ? transition.name : ''}
            />

          </div>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={() => { 
                setTimeout(
                  toggleDrawer(anchor, false), 50)  
                       
            }}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
}

export default Events;
