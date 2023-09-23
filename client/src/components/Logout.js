import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeStatus, user_id, user_name } from "../redux/mediaSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {};
  useEffect(() => {
    fetch("/api/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch(
          changeStatus({
            user: false,
          })
        );
        dispatch(
          user_id({
            userid: null,
          })
        );
        dispatch(
          user_name({
            username: null,
          })
        );

        navigate("/login");

        if (res.status !== 201) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <></>;
};

export default Logout;
