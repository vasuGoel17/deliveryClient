import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addData } from "./context/ContextProvider";
import { useContext } from "react";

const Login = () => {
  const { usernameadd, setusernameadd, numberadd, setnumberadd } =
    useContext(addData);
  let navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = values;
    console.log(username, password);
    const data = await fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const res = await data.json();

    console.log(res);
    console.log(res.status);
    if (res.status === 404 || !data) {
      // alert("this is not used, please register if you dont have an account");
      toast.error("invalid userid or password");
      console.log("invalid login");
    } else {
      toast.success("valid login");
      localStorage.setItem("userDataToken", res.result.token);
      setValues({
        ...values,
        username: "",
        password: "",
      });
      navigate("/home");
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100%" }}>
      {/* <!-- Navigation Bar  --> */}

      <Navbar />
      {/* <!-- Body  --> */}
      <div
        className="container shadow-container min-height-con mt-5 overflow-hidden round-edge"
        style={{ height: "100vh" }}
      >
        <div className="row bg-dark text-white">
          <div className="col-sm-7 p-3">
            <h2>Login</h2>
          </div>
        </div>
        <div className="row mt-3" style={{ height: "80vh" }}>
          <div className="col-sm-4 p-3 bg-image" style={{ height: "100%" }}>
            <img
              src={require("../images/login_image.jpg")}
              alt="Image description"
            />
          </div>
          <div className="col-sm-8 second_content">
            <form method="post" onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label className="form-label" style={{ width: "200px" }}>
                      Username
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Username"
                      onChange={handleChange}
                      value={values.username}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label className="form-label" style={{ width: "200px" }}>
                      Password
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password}
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <p style={{ marginTop: "0.9rem" }}>
                Don't have an id?
                <a
                  className="nav-link"
                  href="register"
                  style={{ display: "inline", marginLeft: "5px" }}
                >
                  <u>REGISTER</u>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="min-height-bottom"></div>
      {/* <!-- Footer --> */}
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Login;
