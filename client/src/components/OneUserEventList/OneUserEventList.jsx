import React from 'react'

function OneUserEventList({date, description, image, name}) {
  return (
    <div>
      <hr/>
      <img src={image} style={{width: '150px'}} />
      <p>{name}</p>
      <p>{description}</p>
      <p>{date}</p>
      <br/>
    </div>
  )
}

export default OneUserEventList
