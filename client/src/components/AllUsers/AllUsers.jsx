import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/allUsers.action";
import OneOfAllUsers from "../OneOfAllUsers/OneOfAllUsers";

import style from "./AllUsers.module.css";

function AllUsers() {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <section className={style.allusers}>
        <div className={style.allusers__wrapper}>
          {list?.map((el) => {
            return <OneOfAllUsers key={el.id} {...el} />;
          })}
        </div>
      </section>
    </>
  );
}

export default AllUsers;
