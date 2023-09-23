import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
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

  const postData = async (e) => {
    e.preventDefault();
    const { username, email, password, cpassword } = user;
    if (!username || !email || !password || !cpassword) {
      // alert("please fill the details!");
      toast.warning("Plz fill all the details!");
    } else if (password !== cpassword) {
      // alert("Both passwords are not same!");
      toast.warning("Both passwords are not same!");
    } else {
      try {
        setLoadingMoadal(true);
        const res = await fetch("/api/users/reset", {
          method: "PUT",
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
        if (data.status === 422) {
          setLoadingMoadal(false);
          toast.warning("Invalid username or email-id!");
          // window.alert("Invalid email or password");
          console.log("Invalid username or email-id");
        } else {
          toast.success("Password changed!");
          // window.alert("Login Successful!");
          console.log("Password changed!");
          setTimeout(() => {
            setLoadingMoadal(false);

            navigate("/login");
          }, 3000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    name="username"
                    onChange={inputHandler}
                  />
                  <label className="form-label" for="form1Example13">
                    Username
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    name="email"
                    onChange={inputHandler}
                  />
                  <label className="form-label" for="form1Example23">
                    Email-Id
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example33"
                    className="form-control form-control-lg"
                    name="password"
                    onChange={inputHandler}
                  />
                  <label className="form-label" for="form1Example23">
                    New Password
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example43"
                    className="form-control form-control-lg"
                    name="cpassword"
                    onChange={inputHandler}
                  />
                  <label className="form-label" for="form1Example23">
                    Re-Enter new password
                  </label>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={postData}
                  >
                    Reset password
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
              </form>
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

export default ResetPassword;
