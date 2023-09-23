import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const [loadingModal, setLoadingMoadal] = useState(false);

  const [description, setDescription] = useState("");
  const [pic, setPic] = useState("");
  const imageInputHandler = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPic(base64);
  };

  const PostData = async (e) => {
    e.preventDefault();

    if (!pic || !description) {
      // alert("please fill the details!");
      toast.warning("Plz fill all the details!");
    } else {
      setLoadingMoadal(true);
      const res = await fetch("/api/posts/post", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          pic,
          description,
        }),
      });

      const data = await res.json();
      console.log(data);
      // console.log(data.status);
      if (data.status === 201) {
        toast.success("Post Uploaded!");
        console.log("Post Uploaded!");
        setTimeout(() => {
          setLoadingMoadal(false);
          navigate("/home");
        }, 2000);
      } else {
        toast.warning("post not sent!");
        console.log("post not sent!");
        setLoadingMoadal(false);
      }
    }
  };

  return (
    <div className="containerHome">
      <h1>Add your post</h1>
      <hr />
      <form method="post">
        <div className="row d-flex flex-row gap-2 align-items-center mb-2 mt-5">
          <div className="form-outline flex-fill mb-5">
            <p>select an image</p>
            <input
              type="file"
              id="pic"
              className="form-control"
              name="pic"
              accept=".jpg, .png, .jpeg"
              onChange={imageInputHandler}
            />
          </div>
          <p>Description</p>
          <div className="form-floating" style={{ marginTop: "-10px" }}>
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              style={{ height: "100px" }}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label for="floatingTextarea" style={{ marginLeft: "15px" }}>
              Enter description
            </label>
          </div>

          <div className="buttons">
            <button className="btn-cancel" onClick={() => navigate("/home")}>
              Cancel
            </button>
            <button type="button" className="btnInfo" onClick={PostData}>
              Add post
            </button>
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
      </form>
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

export default AddPost;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
}
