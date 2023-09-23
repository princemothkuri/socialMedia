import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const status = useSelector((state) => state.media.loginStatus);
  const username = useSelector((state) => state.media.username);
  console.log(status);
  const Render = () => {
    if (status) {
      return (
        <>
          <a href="/home" style={{ textDecoration: "none" }}>
            Home
          </a>
          <a href="/logout" style={{ textDecoration: "none" }}>
            Logout
          </a>
        </>
      );
    } else {
      return (
        <>
          <a href="/login" style={{ textDecoration: "none" }}>
            Login
          </a>
          <a href="/" style={{ textDecoration: "none" }}>
            SignUp
          </a>
        </>
      );
    }
  };

  return (
    <>
      <nav className=" navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container">
          <a className="navbar-brand" href="/home">
            <h3>{username ? username : "Social Media"}</h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center gap-3">
              <Render />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
