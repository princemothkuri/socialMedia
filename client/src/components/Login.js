import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeStatus, user_id, user_name } from "../redux/mediaSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadingModal, setLoadingMoadal] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { username, password } = user;

    if (!username && !password) {
      toast.warning("Plz enter your username and password!");
    } else if (!username) {
      toast.warning("Enter your username!");
    } else if (!password) {
      toast.warning("Enter your password!");
    } else {
      try {
        setLoadingMoadal(true);
        const res = await fetch("/api/users/", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.status === 422) {
          setLoadingMoadal(false);
          toast.warning("Invalid username or password!");
          // window.alert("Invalid email or password");
          console.log("Invalid username or password");
        } else {
          dispatch(
            changeStatus({
              user: true,
            })
          );
          dispatch(
            user_id({
              userid: data.id,
            })
          );
          dispatch(
            user_name({
              username: data.username,
            })
          );
          setLoadingMoadal(false);
          toast.success("Login Successful!");
          // window.alert("Login Successful!");
          console.log("Login Successful!");
          navigate("/home");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                      name="username"
                      onChange={inputHandler}
                    />
                    <label className="form-label" for="typeEmailX-2">
                      Username
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                      name="password"
                      onChange={inputHandler}
                    />
                    <label className="form-label" for="typePasswordX-2">
                      Password
                    </label>
                  </div>
                  <p className="text-end">
                    <a href="/resetpassword">Forget password?</a>
                  </p>
                  <button
                    className="btn btn-primary btn-lg btn-block mt-2"
                    type="submit"
                    onClick={postData}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0 mt-4">
                    Don't have an account?{" "}
                    <a href="/" className=" link-primary">
                      Register
                    </a>
                  </p>
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
            </div>
          </div>
        </div>
      </section>
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

export default Login;
