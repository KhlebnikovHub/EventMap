import React from 'react'
import { useDispatch } from 'react-redux';
import { setNewEventPhoto } from '../../redux/actions/getEvent.action';

function OtherPhotoInput({id}) {
  

  const dispatch = useDispatch();

  const setNewEventPhotoHandler = async (e) => {
    e.preventDefault();
    const otherPhoto = Object.fromEntries(new FormData(e.target));
    dispatch(setNewEventPhoto({id, otherPhoto}));
  }

  return (
    <div>
      <form onSubmit={setNewEventPhotoHandler}>
      <input name="otherPhoto" type="text"></input>
      <button type="submit" > Prinyat' obi4noe FOTO </button>
      </form>
    </div>
  )
}

export default OtherPhotoInput
