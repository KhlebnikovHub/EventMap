import React from 'react'
import { useDispatch } from 'react-redux';
import { setNewEventPhoto } from '../../redux/actions/getEvent.action';

function DiscInput({id}) {

  const dispatch = useDispatch(); 

  const setNewEventPhotoHandler = async (e) => {
    e.preventDefault();
    const googleDisc = Object.fromEntries(new FormData(e.target));
    dispatch(setNewEventPhoto({id, googleDisc}));
  }
  return (
    <div>
      <form onSubmit={setNewEventPhotoHandler}>
        <input name="folder" placeholder="FOLDER" type="text"/>
        <input name="photo" placeholder="PHOTO" type="text"/>
        <button type="submit" > Prinyat' GOOGLEDISC </button>
      </form>
    </div>
  )
}

export default DiscInput
