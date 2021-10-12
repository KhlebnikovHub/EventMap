<YMaps
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
                   

                      }}
                      onLoad={(ymaps) => {
                        if (!yymap) {
                          yymap = ymaps;
                        }
                      

                      }}
                      modules={["templateLayoutFactory", "layout.ImageWithContent", "geolocation", "geocode"]}
                      defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                      onClick={(event) => {
                        try {
                          if (event?.get("coords")) {
                           
                          }
                        } catch (error) {
                          console.log("ERRORRRRR", error);
                        }
                      }}
                    >
                    


                    
                    </Map>
               
            
                
                  </div>
                </div>
              
            </YMaps>
