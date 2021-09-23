import React from 'react'
import { Link } from 'react-router-dom'

function OneUserEventList({date, description, image, name, id}) {
  return (
    <div>
      <hr/>
      <img src={image} style={{width: '150px'}} />
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
