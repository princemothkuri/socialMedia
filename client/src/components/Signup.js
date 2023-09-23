import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [loadingModal, setLoadingMoadal] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { username, email, password, cpassword } = user;

    if (!username || !email || !password || !cpassword) {
      // alert("please fill the details!");
      toast.warning("Plz fill all the details!");
    } else if (password !== cpassword) {
      // alert("Both passwords are not same!");
      toast.warning("Both passwords are not same!");
    } else {
      setLoadingMoadal(true);
      const res = await fetch("/api/register/", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);
      // console.log(data.status);
      if (data.status === 400) {
        toast.success(`${username} you already registered!`);
        console.log("Email already exists!");
        setTimeout(() => {
          setLoadingMoadal(false);
          navigate("/login");
        }, 3000);
      } else if (data.status === 201) {
        toast.success("Registration successful!");
        // window.alert("Registration successful!");
        console.log("Registration successful!");
        setTimeout(() => {
          setLoadingMoadal(false);
          navigate("/login");
        }, 3000);
      } else {
        toast.warning("Invalid Registration!");
        // window.alert("Invalid Registration");
        console.log("Invalid Registration");
        setLoadingMoadal(false);
      }
    }
  };

  return (
    <>
      <section
        className=""
        style={{ backgroundColor: "#eee", height: "100vh" }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-1">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-2">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-1">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="username"
                              onChange={inputHandler}
                            />
                            <label className="form-label" for="form3Example1c">
                              Username
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-1">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              onChange={inputHandler}
                            />
                            <label className="form-label" for="form3Example3c">
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-1">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name="password"
                              onChange={inputHandler}
                            />
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-1">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              name="cpassword"
                              onChange={inputHandler}
                            />
                            <label className="form-label" for="form3Example4cd">
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            onClick={PostData}
                            type="button"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
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
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        class="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      </section>
    </>
  );
};

export default Signup;
