import { useDispatch } from "react-redux";
import { editAvaToBack } from "../../redux/actions/currentUser.action";
import exifr from "exifr";

import style from "./ProfileUserCard.module.css";

function ProfileUserCard({ id, firstname, lastname, email, avatar }) {
  console.log("IDIDIDIDI", id);

  const dispatch = useDispatch();

  const editAvaHandler = async (event) => {
    event.preventDefault();

    const file = event.target.img.files[0];

    // let {latitude, longitude} = await exifr.gps(file);
    // console.log(latitude, longitude)

    const formData = new FormData();
    formData.append("img", file);
    dispatch(editAvaToBack(id, formData));
    event.target.reset();
  };

  const dragStartHandler = (event) => {
    event.preventDefault();
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault();
  };

  const dropHandler = async (event) => {
    event.preventDefault();
    let fileDrag = event.dataTransfer.files[0];

    //et {latitude, longitude} = await exifr.gps(fileDrag);
    //console.log('GPS', latitude, longitude)

    const formDragData = new FormData();
    formDragData.append("img", fileDrag);
    dispatch(editAvaToBack(id, formDragData));
  };

  if (!avatar?.includes("http")) {
    avatar = `${process.env.REACT_APP_API_URL}${avatar}`;
  }

  return (
    <>
      <section className={style.profile}>
        <div className={style.profile__}>
          <div className={style.profile__}>
            <img className={style.profile__} id="img" src={`${avatar}`} />
          </div>

          <div className={style.profile__}>
            <p className={style.profile__}>{firstname}</p>
            <p className={style.profile__}>{lastname}</p>
            <p className={style.profile__}>{email}</p>
          </div>

          <div className={style.profile__}>
            <div
              encType="multipart/form-data"
              name="img"
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              onDrop={dropHandler}
            ></div>
          </div>
        </div>

        <div className={style.profile__}>
          <form className={style.profile__} onSubmit={editAvaHandler} encType="multipart/form-data">
            <input className={style.profile__} type="file" name="img" />
            <button className={style.profile__}>send</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ProfileUserCard;
