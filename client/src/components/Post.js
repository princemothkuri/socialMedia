import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import axios from "axios";
import Loading from "./Loading";

const Post = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.media.username);
  // const { id } = useParams(); // add inside your component body
  const [searchParams, setSearchParams] = useSearchParams();
  const postID = searchParams.get("id");

  const [loadingModal, setLoadingMoadal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");
  const [pic, setPic] = useState();
  const [comments, setComments] = useState([]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      setLoadingMoadal(true);

      const response = await fetch("/api/posts/comment", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          id: postID,
          comment: comment,
          username: username,
        }),
      });
      const data = await response.json();
      console.log(data);
      setComments((comments) => [
        ...comments,
        { comment: comment, username: username },
      ]);
      setLoadingMoadal(false);
      setComment("");
    } catch (error) {
      console.log(error);
    }
    // setdata((data) => [...data, { name: "sunitha" }]);
    // console.log("done");
  };

  const getAllComments = async () => {
    try {
      const response = await fetch("/api/posts/postid", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          id: postID,
        }),
      });
      const data = await response.json();
      console.log(data);
      setPic(data.post.image);
      setComments(data.post.comments);
      setDescription(data.post.description);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllComments();
    console.log(comments[0]);
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="container">
      <div className="card mt-3" style={{ border: "none" }}>
        <div className="row g-0">
          <div className="col-md-7 d-flex flex-column gap-4">
            <img
              src={pic}
              className="img-fluid rounded-start"
              alt="..."
              style={{ borderRadius: "5px" }}
            />
            <p className="p-3">
              <span style={{ color: "#616161" }}>
                Description <br />
              </span>
              {description}
            </p>
          </div>
          <div className="col-md-5">
            <div className="post-card-body" style={{ height: "auto" }}>
              <h5 className="card-title text-end mb-5">Comments</h5>
              <div className="card-text d-flex justify-content-start align-items-end overflow-hidden">
                {comments.length === 0 ? (
                  <p id="no-comments">no comments</p>
                ) : (
                  <ul style={{ listStyleType: "none", marginLeft: "-20px" }}>
                    {comments.map(function (item, index) {
                      return (
                        <li key={index} className="d-flex gap-3">
                          <p style={{ fontWeight: "500" }}>@{item.username}</p>
                          <p style={{}}>{item.comment}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <form
                method="POST"
                onSubmit={postComment}
                className="post-comment"
                style={{ gap: "5px" }}
              >
                <div className="form-floating" style={{ width: "92%" }}>
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <label for="floatingInput">Comment</label>
                </div>
                <input
                  type="submit"
                  className="btn btn-outline-secondary"
                  style={{ height: "56px" }}
                  value="send"
                />
              </form>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
