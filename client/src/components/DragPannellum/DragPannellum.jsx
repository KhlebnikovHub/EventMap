function DragPannellum( {id} ) {
  console.log('666', id)

  const dragStartHandler = (event) => {
    event.preventDefault();
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault();
  };

  const dropHandler = async (event) => {
    event.preventDefault();
    let panorama = event.dataTransfer.files[0];
    const panoramaFile = new FormData();
    panoramaFile.append("img", panorama);
    
    await fetch(`${process.env.REACT_APP_API_URL}/panorama/${id}`, {
      method: 'PATCH',
      body: panoramaFile,
    })

  };

  return (
    <div
    encType="multipart/form-data"
    name='img'
    onDragStart={(e) => dragStartHandler(e)}
    onDragLeave={(e) => dragLeaveHandler(e)}
    onDragOver={(e) => dragStartHandler(e)}
    onDrop={dropHandler}>
      перетащите панораму
    </div>
  )
}

export default DragPannellum
