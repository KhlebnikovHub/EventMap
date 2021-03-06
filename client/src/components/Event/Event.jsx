import AwesomeSlider from 'react-awesome-slider';
import coreStyles from 'react-awesome-slider/src/core/styles.scss';
import animationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';

import { useParams } from "react-router";
import { getEvent } from "../../redux/actions/getEvent.action.js";
import { editEvent } from "../../redux/actions/getEvent.action.js";
import EventEditForm from "../EventEditForm/EventEditForm.jsx";
import style from "./Event.module.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtherPhotoInput from "../OtherPhotoInput/OtherPhotoInput.jsx";
import DiscInput from "../DiscInput/DiscInput.jsx";

function Event() {
  const currentUserFromState = useSelector((state) => state.currentuser);
 
  const [showEditButton, setShowEditButton] = useState(true)
  const [showSubmitButton, setShowSubmitButton] = useState(false)
  const [showFileButton, setShowFileButton] = useState(false)

  const [inputChange, setInputChange] = useState(<DiscInput />);
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => {
    
    return state.event });

  const { id } = useParams();

  useEffect(() => {
    dispatch(getEvent(id));
  }, []);

  const editEventHandler = async (e) => {
    e.preventDefault();
    const newFormData = Object.fromEntries(new FormData(e.target));
    dispatch(editEvent(id, newFormData));
  }

  const switchEditFrom = () => {
    setShowEditButton(!showEditButton)
    setShowSubmitButton(!showSubmitButton)
  }

  const switchFileButton = () => {
    setShowFileButton(prev => !prev)
  }

  if(list) {
    if (!list?.image?.includes("http")) {
      list.image = `${process.env.REACT_APP_API_URL}${list?.image}`;
       }
  }
  
    
    const DiscInputHandler = () => {
      setInputChange(<DiscInput id={id} />);
    };
  const PhotoInputHandler = () => {
    setInputChange(<OtherPhotoInput id={id} />);
  };
  

  const slider = (
    <AwesomeSlider
    
    animation="foldOutAnimation"
    cssModule={[coreStyles, animationStyles]}
  >
    
      {list?.Images?.map(image => {
         return (  <div data-src={image?.path}  />
          )})}
         
    </AwesomeSlider>
  );

  return (
    <>
    
   {list?.User?.email === currentUserFromState?.email ? 
      <div>
        <button onClick={DiscInputHandler}>
          ?????????????????? ???????????? ?? GoogleDisc
        </button>
        <button onClick={PhotoInputHandler}>
          ?????????????????? ?????????????? ????????
        </button>
        <div>{inputChange}</div>
      </div>
   : ''} 

  

     {showEditButton && <div className={style.event}>
        <div className={style.event__pic_wrapper}>
          {/* <img className={style.event__pic} src={`${image}`} alt="" />
        </div> */}
          {slider}
          <img className={style.event__pic} src={list?.image} alt="" />
        </div>
        {/* {list?.Images?.map(image => {
         return (  <img className={style.event__pic} src={image?.path} alt="" />
          )})} */}

       
        <div className={style.event__info}>
        
          <div className={style.event__text_box}>
         
            <p className={style.event__text_title}>????????????????: </p>
            <p className={style.event__text}>{list?.name}</p>
          </div>

          <div className={style.event__text_box}>
          
            <p className={style.event__text_title}>????????????????: </p>
            <p className={style.event__text}>{list?.description}</p>
          </div>

          <div className={style.event__text_box}>
            <p className={style.event__text_title}>??????????:</p>
            <p className={style.event__text}>{list?.Place?.name}</p>
          </div>

          <div className={style.event__text_box}>
            <p className={style.event__text_title}>??????????:</p>
            <p className={style.event__text}>
              {list?.User?.firstname} {list?.User?.lastname}
            </p>
          </div>
          {list?.User?.email === currentUserFromState?.email ? 
            <button onClick={switchEditFrom}>
            ??????????????????????????
          </button>
          : ''}
          
        </div>
      </div>}

      {showSubmitButton && 
            <form name="name" onSubmit={(e) => { editEventHandler(e); switchEditFrom()}}>
            <input name='name' placeholder="??????" type="text" />
            <input name='description' placeholder="????????????????" type="text" />
            <input name='image' placeholder="???????????? ???? ????????????????" type="text" />
            <button type="submit" >
              ??????????????
            </button>
          </form>  }

    </>
  );
}

export default Event;
