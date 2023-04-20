import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addData } from "./context/ContextProvider";
import { useContext } from "react";

const Navbar = () => {
  const { usernameadd, setusernameadd, numberadd, setnumberadd } =
    useContext(addData);
  const [c, setc] = useState(0);
  let navigate = useNavigate();
  // const [un, setun] = useState("");

  const handleClick = () => {
    console.log("clicked");
  };

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validuser = async (c) => {
    let token = localStorage.getItem("userDataToken");
    const res = await fetch("/api/validuser", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    });
    // console.log("this is " + token + "dashboard vaslid");
    const data = await res.json();
    if (data.status == 401 || !data) {
      //   navigate("../*");
      console.log("user not verify");
      setc(0);
    } else {
      const username = data.validuserone.username;
      const number = data.validuserone.number;
      // setun(username);
      setusernameadd(username);
      setnumberadd(number);
      console.log("user verify");
      setc(1);
    }
  };

  const logoutuser = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("userDataToken");
    // console.log("naya vaala " + token);

    const res = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    // console.log("loggout out user" + token);
    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
      console.log("user logout");
      localStorage.removeItem("userDataToken");
      alert("user Logout");
      navigate("/");
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    validuser(c);
  }, []);

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <div className="navbar-brand">
          <i
            className="fa fa-cubes"
            style={{ fontSize: "60px", color: "#FF8C00" }}
          ></i>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
          aria-controls="collapsibleNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="deliveries">
                Deliveries Available
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="travelling">
                Driver Traveling
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="event">
                Event
              </a>
            </li>
            <li className="nav-item">
              {c === 0 ? (
                <a className="nav-link" href="login">
                  Login
                </a>
              ) : (
                <a className="nav-link" onClick={logoutuser} href="">
                  LogOut
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
