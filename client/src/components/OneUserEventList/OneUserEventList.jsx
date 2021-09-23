import React from 'react'

function OneUserEventList({date, description, image, name}) {
  console.log('IMG^^^', image)
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
    </div>
  )
}

export default OneUserEventList
