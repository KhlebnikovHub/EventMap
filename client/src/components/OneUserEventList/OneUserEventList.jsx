import React from 'react'
import { Link } from 'react-router-dom'

function OneUserEventList({ id, date, description, image, name}) {
  
  if (!image?.includes("http")) {
    image = `${process.env.REACT_APP_API_URL}${image}`;
  }
  return (
    <div>
      <hr/>
      <img src={`${image}`} style={{width: '150px'}} />
      <p>{name}</p>
      <p>{description}</p>
      <p>{date}</p>
      <br/>
      <Link to={`/Event/${id}`}>
            аааа
          </Link>
    </div>
  )
}

export default OneUserEventList
