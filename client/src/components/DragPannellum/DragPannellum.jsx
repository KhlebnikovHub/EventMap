function DragPannellum({ id }) {
  console.log('666', id)

  const dragStartHandler = (event) => {
    event.preventDefault();
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault();
  };

  const dropHandler = async (event) => {
    event.preventDefault();
    let fileDrag = event.dataTransfer.files[0];
    // const formDragData = new FormData();
    // formDragData.append("img", fileDrag);
    // console.log('13', formDragData)
    await fetch(`${process.env.REACT_APP_API_URL}/panorama/${id}`, {
      method: 'PATCH',
      body: fileDrag,
    })


    

  };

  return (
    <div
    encType="multipart/form-data"
    onDragStart={(e) => dragStartHandler(e)}
    onDragLeave={(e) => dragLeaveHandler(e)}
    onDragOver={(e) => dragStartHandler(e)}
    onDrop={dropHandler}>
      перетащите панораму
    </div>
  )
}

export default DragPannellum
