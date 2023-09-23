import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import Loading from "./Loading";
import Post from "./Post";

const Home = () => {
  const status = useSelector((state) => state.media.user);
  // console.log(status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [del, setDel] = useState(false);
  const [loadingModal, setLoadingMoadal] = useState(false);
  const [like, setLike] = useState(false);
  const [unLike, setUnLike] = useState(false);

  const [pics, setPics] = useState();

  const getAllPosts = async () => {
    try {
      const response = await axios.get("/api/posts/");
      console.log(response.data.posts);
      setPics(response.data.posts);
      setLoading(false);
      setLoadingMoadal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const likeHandler = () => {
  //   if (like) {
  //     setLike(false);
  //   } else {
  //     setLike(true);
  //   }
  // };

  // const unLikeHandler = () => {
  //   if (unLike) {
  //     setUnLike(false);
  //   } else {
  //     setUnLike(true);
  //   }
  // };

  useEffect(() => {
    getAllPosts();
  }, [del]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="container">
      <div className="add row p-2 ">
        <h1 className="col-4">Posts</h1>
        <div className="col-8 d-flex justify-content-end align-items-center">
          <button className="btnInfo" onClick={() => navigate("/addpost")}>
            Add photos
          </button>
        </div>
      </div>
      <div className="containerHome">
        {pics.map(function (item, index) {
          return (
            <>
              <div className="card mb-3" key={index}>
                <img src={item.image} className="card-img-top" alt="image" />
                <div className="card-body">
                  <p className="card-text">
                    <small className="text-muted">Description</small>
                    <br />
                    {item.description}
                  </p>
                  <p>
                    <small className="text-muted">Posted by:</small>
                    <br />@{item.username}
                  </p>
                  <div className="card-btn d-flex justify-content-between gap-3">
                    <div className=" d-flex gap-3 mt-3">
                      <div
                        className="like"
                        onClick={async () => {
                          setLoadingMoadal(true);

                          try {
                            const res = await fetch("/api/posts/like", {
                              method: "PUT",
                              headers: {
                                "content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                id: item._id,
                              }),
                            });
                            const data = await res.json();
                            console.log(data);
                            if (data.status === 201) {
                              if (del) {
                                setDel(false);
                              } else {
                                setDel(true);
                              }
                            } else {
                              toast.alert("you have already liked!");
                            }
                          } catch (error) {
                            setLoadingMoadal(false);

                            console.log(error);
                          }
                        }}
                      >
                        {!like ? <ThumbUpOutlinedIcon /> : <ThumbUpIcon />}(
                        {item.likes.length})
                      </div>
                      <div
                        className="unlike"
                        onClick={async () => {
                          setLoadingMoadal(true);

                          try {
                            const res = await fetch("/api/posts/unlike", {
                              method: "PUT",
                              headers: {
                                "content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                id: item._id,
                              }),
                            });
                            const data = await res.json();
                            console.log(data);
                            if (data.status === 201) {
                              if (del) {
                                setDel(false);
                              } else {
                                setDel(true);
                              }
                            } else {
                              toast.alert("you have already unliked!");
                            }
                          } catch (error) {
                            setLoadingMoadal(false);

                            console.log(error);
                          }
                        }}
                      >
                        {!unLike ? (
                          <ThumbDownAltOutlinedIcon />
                        ) : (
                          <ThumbDownIcon />
                        )}
                        ({item.unlikes.length})
                      </div>
                    </div>
                    <div
                      className="comment d-flex justify-content-center align-items-center"
                      //   style={{ border: "1px solid" }}
                      onClick={() => navigate(`/post?id=${item._id}`)}
                    >
                      <InsertCommentOutlinedIcon />
                      <p className="p-1 mt-2">Comments</p>
                    </div>
                  </div>
                  {item.user === status ? (
                    <button
                      className="btn btn-outline-danger mt-1"
                      onClick={async () => {
                        setLoadingMoadal(true);

                        try {
                          const res = await fetch("/api/posts/", {
                            method: "DELETE",
                            headers: {
                              "content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              id: item._id,
                            }),
                          });
                          const data = await res.json();
                          console.log(data);
                          if (del) {
                            setDel(false);
                          } else {
                            setDel(true);
                          }
                        } catch (error) {
                          setLoadingMoadal(false);

                          console.log(error);
                        }
                      }}
                    >
                      Delete post
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                {/* --------------modal-Loading--------------- */}
                {loadingModal ? (
                  <>
                    <div className="modal-wrapper "></div>
                    <div className="modal-container-loading">
                      <div className="circleDots">
                        <ReactLoading
                          type="spinningBubbles"
                          color="#0000FF"
                          height={80}
                          width={80}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {/* --------------modal-Loading END--------------- */}
              </div>
            </>
          );
        })}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Home;
