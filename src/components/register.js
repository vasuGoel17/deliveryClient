import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { addData } from "./context/ContextProvider";
import { useContext } from "react";

const Register = () => {
  const { usernameadd, setusernameadd, numberadd, setnumberadd } =
    useContext(addData);
  let navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("values: ", values);

    if (
      values.username !== "" &&
      values.password !== "" &&
      values.number !== "" &&
      values.confirmPassword !== ""
    ) {
      const { username, password, confirmPassword, number } = values;
      const data = await fetch("/api/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          confirmPassword: confirmPassword,
          number: number,
        }),
      });
      const res = await data.json();
      console.log("res: ", res);
      // console.log(data);
      if (res.status === 201) {
        alert("You are Registred successfully, now login");
        setValues({
          ...values,
          username: "",
          password: "",
          number: "",
          confirmPassword: "",
        });
        navigate("../login");
      } else {
        alert("this is already used, please try something different");
        console.log("invalid registration");
      }
    } else {
      alert("Solve the errors before submit");
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
            <h2>Registration</h2>
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
                      type="piplineName"
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
                      Contact Number
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="filePath"
                      className="form-control"
                      name="number"
                      placeholder="Contact Number"
                      onChange={handleChange}
                      value={values.number}
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
              <div className="mb-3">
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label className="form-label" style={{ width: "200px" }}>
                      Confirm Password
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      value={values.confirmPassword}
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: "0.9rem" }}
              >
                Create
              </button>
              <p style={{ marginTop: "0.7rem" }}>
                Already a user?
                <a
                  className="nav-link"
                  href="login"
                  style={{ display: "inline", marginLeft: "5px" }}
                >
                  <u>LOGIN</u>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="min-height-bottom"></div>
      {/* <!-- Footer --> */}
      <Footer />
    </div>
  );
};

export default Register;
