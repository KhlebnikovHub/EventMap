import React, { useEffect } from 'react'
import { YMaps, Map, Clusterer, FullscreenControl, SearchControl, Placemark } from 'react-yandex-maps';
import { createRef, useState } from 'react';
import style from "./Events.module.css";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaces } from '../../redux/actions/places.action';
import AddEvent from '../AddEvent/AddEvent';
import exifr from 'exifr'




function createBalloonLayout(ymaps) {
  const BalloonLayout = ymaps?.templateLayoutFactory?.createClass(
    `
    
     <div style="width:50px;height:100px;background-color:black;"></div>
    
  `, {

  },

  );
  return BalloonLayout
}


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function Events() {

  const user_id = 2;

  const { list: allPlaces, isLoading, error } = useSelector((state) => state.allPlaces)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPlaces(user_id))
  }, [])


  const createHandler = (event) => {
    event.preventDefault();



  }


  const [search, setSearch] = useState('');
  const [state, setState] = useState({ coords: [] })
  const [newCoords, setNewCoords] = useState([]);
  const [ballonstate, setBallonstate] = useState({ balloonContent: '<h1>Hello! =))</h1>' })
  const [ref, setRef] = useState(null);
  const [ imgDrag, setImgDrag ] = useState(null)
  const [ imgSrc, setImgSrc] = useState();
  //const [exifrGps, setExifrGps] = useState([]);
  const [imgName, setImgName] = useState();
  const [files, setFiles] = useState();

  const [customState, setCustomState] = useState([])
  const [clusterState, setClusterState] = useState([])

  const [supercustom, setSupercustom] = useState({
    template: null
  })
  let [map, setMap] = useState('')
  let yymap;
  const [switcher, setSwitcher] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const onSwitcher = () => {
    setSwitcher(prev => !prev);
  }

  const setClusterIcon = (ymaps) => {

    console.log(map);
    map.geoObjects?.each((geoObject) => {
      if (geoObject._clusters) {
        console.log('geoOBJECT', geoObject)
        let clusters = geoObject._clusters;
        for (let key in clusters) {
          console.log('CLUSTERYAGA', key, clusters[key])
          if (clusters[key]?.clusterObject?.options) {

            const features = clusters[key].hash.features;
            let latestFeature;
            for (let i = 0; i < features.length; i++) {
              const [latitude, longitude] = features[i].geometry.coordinates;
              features[i].date = new Date(allPlaces?.find(el => +el.latitude === latitude && +el.longitude === longitude)?.Events[0]?.createdAt);
            }
            latestFeature = features[0];
            for (let i = 1; i < features.length; i++) {
              latestFeature = features[i].date.getTime() > latestFeature.date.getTime() ? features[i] : latestFeature;
            }

            console.log("LATEEEEESSSST FEAAATUUUUURE", latestFeature);

            let randomFeature = features[Math.round((features.length - 1) * Math.random())].geometry.coordinates;
            let latestFeatureCoordinates = latestFeature.geometry.coordinates;
            const latestIndexTemplate = customState.findIndex(el => {

              const [randomLatitude, randomLongitude] = randomFeature;
              const [latestLatitude, latestLongitude] = latestFeatureCoordinates;
              const [elLatitude, elLongitude] = el.coordinates;
              return (latestLatitude === elLatitude && latestLongitude === elLongitude)
            })



            clusters[key]?.clusterObject?.options.set('clusterIconContentLayout', clusterState[latestIndexTemplate]?.template);
          }
        }
      }
    })
  }

  const handleApiAvaliable = (ymaps) => {
    let balloonContent = createBalloonLayout(ymaps);
    setBallonstate({ balloonContent: balloonContent });
  }

  const handlerInitMap = () => {
    if (map) {
      map?.events.add('wheel', setClusterIcon)
      map?.events.add('boundschange', setClusterIcon)
      map?.events.add('actionend', setClusterIcon)
      console.log("CENTTTTTEEEEREREEEEERERERERRR", map.getCenter())
      map.panTo(map.getCenter())

    }
  };


  const createTemplateLayoutFactory = ymaps => {

    console.log("YMAMAMAP", ymaps);
    // && !customState?.template || ymaps && !supercustom?.template
    if (ymaps) {
      for (let i = 0; i < allPlaces.length; i++) {
        console.log(allPlaces[i]?.Events[0]?.image);

        setCustomState(prev => [...prev, {
          coordinates: [+allPlaces[i].latitude, +allPlaces[i].longitude],
          template: ymaps?.templateLayoutFactory?.createClass(
            `
                  <div class="card">
                    <div class="card-image">
                      <img width="100" height="80" src="${process.env.REACT_APP_API_URL}${allPlaces[i]?.Events[0]?.image}">
                    </div>
                  </div>
                
              `
          ),
        }]);

        setClusterState(prev => [...prev, {
          coordinates: [+allPlaces[i].latitude, +allPlaces[i].longitude],
          template: ymaps?.templateLayoutFactory?.createClass(
            `
                <div class="card">
                  <div class="card-image">
                    <img width="100" height="80" src="${process.env.REACT_APP_API_URL}${allPlaces[i]?.Events[0]?.image}">
                  </div>
                </div>
              
            `
          ),
        }]);



      }

      console.log("CUSTOM STATE", customState);
      setSupercustom(
        {
          template: ymaps?.templateLayoutFactory?.createClass(
            `
                
          <h2>Hello!))</h2>
    
              `
          ),
        }
      )
    }
  };

  const polyline = createRef(null);

  const onMapClick = (event) => {

    if (switcher) {
      try {
        setState(state => {
          return {
            coords: [...state?.coords, event?.get("coords")]
          };
        });
        setNewCoords(event?.get("coords"));
        handleOpen();
      } catch (error) {
        console.log("ERRRRRRRRORRRRR", error);
      }
    }


  }


  const dragStartHandler = (event) => {
    event.preventDefault()
  }

  const dragLeaveHandler = (event) => {
    event.preventDefault()
  }

  let imgCoord = [];

  const dropHandler = async (event) => {
    event.preventDefault()
    try { 
      let fileDrag = event.dataTransfer.files[0];
      setFiles(event.dataTransfer.files)

      setImgName(event.dataTransfer.files[0].name)

      imgCoord = await exifr.gps(fileDrag);

      setNewCoords([imgCoord?.latitude, imgCoord?.longitude]);
      map?.panTo([imgCoord?.latitude, imgCoord?.longitude], { duration: 2000, flying: true });
      // const formDragData = new FormData();
      // formDragData.append('img', fileDrag)

      setTimeout(() => {
        handleOpen()

      }, 2000);
      
    } catch (error) {
      console.log(error)
    }
  }
  
// useEffect(() => {
// console.log('GPS', exifrGps)

// }, [exifrGps]);
  


  return (
    <div  onClick = {() => {
      console.log("SEARCH RESULT", search?. getResult(0))
      
    }}>
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyle}>
              <AddEvent imgName={imgName} newCoords={newCoords} setImgName={setImgName} files={files}/>

            </Box>
          </Fade>
        </Modal>
      </div>
      <div>
        <button onClick={onSwitcher}>Включить</button>
      </div>
      <YMaps
       
        query={{
          apikey: 'ca6c950f-dbfc-4b92-9866-e35c7b2be031&lang=ru_RU',
        }}
        version={"2.1"}
      >
        <div>
          My awesome application with maps!
          <div 
          encType="multipart/form-data"
          name="img"
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragLeaveHandler(e)}
          onDragOver={e => dragStartHandler(e)}
          onDrop={dropHandler}
          >
          <Map
          
            className={style.map}
            instanceRef={ref => { setMap(ref); handlerInitMap(); }}
            onLoad={(ymaps) => {
              yymap = ymaps;
              console.log("CENTEEEEEEEEEEEEER", ymaps?.map?.getCenter())
              createTemplateLayoutFactory(ymaps);
              handleApiAvaliable(ymaps);

              setClusterIcon(ymaps.map)

            }
            }
            modules={['templateLayoutFactory', "layout.ImageWithContent"]}
            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            onClick={(event) => {
              try {
                if (event?.get("coords")) {
                  console.log("IFIFIFIFIFIF", event?.get("coords"))
                  onMapClick(event)
                }
              } catch (error) {
                console.log("ERRORRRRR", error);
              }
            }
            }>

            <Clusterer
              instanceRef={ref => {
                //     if(ref) {
                //       console.log("REFAREFAREFAREFAREFA", ref?.getParent())
                //       console.log("REEEEEEEEEEEEEEEEFGGFGFG", ref?.getGeoObjects())
                //       console.log("GEOOBJECTS", ref?.properties?.geoObjects);
                //       console.log(Object.entries(ref));
                //      for(let key in ref) {
                //        if(key === "_clusters") {
                //        let clusters = ref[key];
                //        console.log('CLUSTERS', clusters);
                //        console.log(Object.keys(clusters))
                //        console.log(clusters);

                //      }
                // }

                //     }
              }
              }

              options={{
                // preset: 'islands#invertedVioletClusterIcons',
                iconImageSize: [0, 0], // размер нашей картинки
                clusterIconLayout: 'default#imageWithContent',

                // clusterIconImageHref: 'http://s49novouralsk.edusite.ru/images/knopka.png',
                // clusterIconContentLayout: customState[0].template,

                // clusterIconContentLayout: customState.template,
                // iconContentSize: [100,100],

                clusterIcons: [
                  {
                    href: 'data:image/png;base64,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',
                    size: [40, 40],
                    offset: [0, 10]
                  },
                  {
                    href: 'https://cdn4.vectorstock.com/i/1000x1000/20/73/black-cat-icon-flat-vector-11112073.jpg',
                    size: [60, 60],
                    offset: [-30, -30]
                  }],

                iconShape: {
                  type: 'Rectangle',
                  // Прямоугольник описывается в виде двух точек - верхней левой и нижней правой.
                  coordinates: [
                    [-50, -50], [100, 100]
                  ]
                },

                // clusterDisableClickZoom: true,
                // clusterHideIconOnBalloonOpen: false,
                // geoObjectHideIconOnBalloonOpen: false
              }}

            >

              {allPlaces?.map((place, index) => (



                <Placemark
                  onClick={(event) => console.log("EVENT TARGEEEEEEEEEEEEEEEEEET", event)}
                  className="round"
                  key={Math.round(Math.random() * 11532)}
                  geometry={[+place?.latitude, +place?.longitude]}
                  options={{
                    // iconLayout: 'default#image',
                    iconImageSize: [40, 40], // размер нашей картинки
                    iconLayout: 'default#imageWithContent',

                    iconShape: {
                      type: 'Rectangle',
                      // Прямоугольник описывается в виде двух точек - верхней левой и нижней правой.
                      coordinates: [
                        [-50, -50], [100, 100]
                      ]
                    },

                    iconContentLayout: customState[index]?.template,
                    iconContentSize: [70, 70],
                    iconContentOffset: [-30, -90],

                    iconImageHref: 'http://s49novouralsk.edusite.ru/images/knopka.png',
                    hideIconOnBalloonOpen: false, //запрет на скрытие метки по клику на балун

                    balloonContentLayout: ballonstate.balloonContent,
                    balloonPanelMaxMapArea: 1,
                    openEmptyBalloon: true

                  }}
                  modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                  instanceRef={ref => {
                    if (ref) {

                      console.log("RGREEEEF", ref.getParent()?._clusters)
                      let clusters = ref.getParent()?._clusters;
                      for (let cluster in clusters) {
                        console.log('ONE_CLUSTER', clusters[cluster])
                        console.log('ICOOOOOOOOOOOOOON', clusters[cluster].clusterObject?.options)
                        if (clusters[cluster].clusterObject?.options) {
                          console.log("FUUUUUU");
                          // clusters[cluster].clusterObject?.options.set('clusterIcons', [
                          //   {
                          //     href: "https://img2.freepng.ru/20190131/ilj/kisspng-black-cat-whiskers-kitten-clicker-training-kittens-clipart-catl-for-free-download-and-use-in-5c5304b658bc54.8871701115489445663635.jpg",
                          //     size: [40, 40],
                          //     offset: [-20, -20]
                          //   }
                          // ])

                          // clusters[cluster].clusterObject?.options.set('clusterIconContentLayout', supercustom.template) 
                          // setClusterIcon();

                          // clusters[cluster].clusterObject.options._cache.clusterIcons[1].href="https://img2.freepng.ru/20190131/ilj/kisspng-black-cat-whiskers-kitten-clicker-training-kittens-clipart-catl-for-free-download-and-use-in-5c5304b658bc54.8871701115489445663635.jpg"
                        }
                      }
                    }
                  }}
                  properties={{
                    // iconCaption : 'asd'
                  }}

                />

              ))}
            </Clusterer>
            <Placemark
              geometry={[55.661574, 37.573856]}
              options={{
                draggable: true,
                iconLayout: 'default#image',
                iconImageHref: 'http://s49novouralsk.edusite.ru/images/knopka.png',
              }}
              // Событие change связано с св-вом geometry инстанса метки, 
              // поэтому onChange работать не будет, придется использовать instanceRef

              instanceRef={ref => {
                if (ref) {
                  // По аналогии добавляем обработчик
                  ref.geometry.events.add("change", function (e) {
                    const newCoords = e.get("newCoordinates");
                    // Используя ссылку на инстанс Линии меняем ее геометрию
                    console.log(newCoords);
                  });
                }
              }}
            />

            <FullscreenControl />
            <SearchControl
              instanceRef={ref => {
                if(ref) {
                  console.log("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEFik", ref.getSelectedIndex())
                  console.log(ref.showResult(0))
                  setSearch(ref)
                }
              }}
              options={{ provider: 'yandex#search' }}

            />
          </ Map>
          </div>
        </div>
      </YMaps>

    </div>

  );
}

export default Events
