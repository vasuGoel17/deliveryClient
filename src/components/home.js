import React from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import Validuser from "./validuser";
import { addData } from "./context/ContextProvider";
import { useContext } from "react";
import Alert from "react-bootstrap/Alert";

const Home = () => {
  const { usernameadd, setusernameadd, numberadd, setnumberadd } =
    useContext(addData);
  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100%" }}>
      {usernameadd ? (
        <Alert variant="success" onClose={() => setusernameadd("")} dismissible>
          {usernameadd}
        </Alert>
      ) : (
        <Alert variant="danger" onClose={() => setusernameadd("")} dismissible>
          Please Sign In First!!
        </Alert>
      )}

      <Navbar />
      {/* <!-- Body  --> */}
      <div
        className="container shadow-container min-height-con mt-5 overflow-hidden round-edge"
        style={{ display: "flex" }}
      >
        <div className="row mt-3" style={{ flex: "1" }}>
          <div className="col-sm-4 p-3 bg-image" style={{ height: "100%" }}>
            <img
              src={require("../images/login_image.jpg")}
              alt="Image description"
            />
          </div>
          <div className="col-sm-8 second_content">
            <div>
              <h1>Driver Delivery</h1>
              <br />
              <p>
                <br />
                Namma Yatri <b>Hackathon Project</b> <br />
                <b>Driver Empowerment :</b>
                Driver Earning Improvement
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="min-height-bottom"></div>
      {/* <!-- Footer --> */}
      {/* <Validuser /> */}
      <Footer />
    </div>
  );
};

export default Home;
