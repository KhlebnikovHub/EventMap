import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getOneUser } from '../../redux/actions/OneUser.action'
import { getAllPlaces } from '../../redux/actions/places.action'
import OneUserEventList from '../OneUserEventList/OneUserEventList'

function OneUserInfo() {

  const { list, isLoading, error } = useSelector((state) => state.oneUser)
  const { list: allPlaces} = useSelector(
    (state) => state.allPlaces
  );

  console.log('JJJIIIJJJAAAAA', allPlaces);

  if (!list?.avatar?.includes("http")) {
    list.avatar = `${process.env.REACT_APP_API_URL}${list?.avatar}`;
  }

  const dispatch = useDispatch()
  const { id } = useParams();


  useEffect(() => {
    dispatch(getOneUser(id))
    dispatch(getAllPlaces(id));
  }, [])
  
  return (
    <div>
      <br/>
      <img src={list?.avatar} style={{ width: '200px'}}/>
      <p>{list?.lastname}</p>
      <p>{list?.email}</p>
      <p>{list?.firstname}</p>
      <div>
        {list?.Events?.map((el) => <OneUserEventList key={el.id} {...el} />
        )}
      </div>
    </div>
  )
}

export default OneUserInfo
