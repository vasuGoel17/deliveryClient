import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import { useLocation, useNavigate } from "react-router-dom";
import { addData } from "./context/ContextProvider";
import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import Tables from "../components/Tables";
import Spiner from "../components/Spiner";

const Event = () => {
  const navigate = useNavigate();
  const { usernameadd, setusernameadd, numberadd, setnumberadd } =
    useContext(addData);
  const [userdata, setuserdata] = useState([]);
  const location = useLocation();

  const handleClickMinus = () => {
    console.log("click minus");
  };

  // console.log("thiis is usernameadd: ", usernameadd);
  const userget = async () => {
    let token = localStorage.getItem("userDataToken");
    console.log("qqq");
    const res = await fetch("/api/getuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        username: usernameadd,
        number: numberadd,
      }),
    });
    console.log("resssssss: ", res);
    const data = await res.json();
    console.log("dataaaaaa: ", data);
    let temp = [];

    for (let i = 0; i < data.usersdatad.length; i++) {
      temp.push(data.usersdatad[i]);
    }
    for (let i = 0; i < data.usersdatat.length; i++) {
      temp.push(data.usersdatat[i]);
    }
    console.log("temp: ", temp);

    if (data.status === 200) {
      setuserdata(temp);
    } else {
      console.log("error for get userdata");
    }
  };

  useEffect(() => {
    userget();
  }, [usernameadd]);

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
      {/* <!-- Navigation Bar  --> */}
      <Navbar />
      {/* <!-- Body  --> */}
      <div className="container shadow-container min-height-con mt-5 overflow-hidden round-edge">
        <div className="row bg-dark text-white">
          <div className="col-sm-10 p-3">
            <h2>Event</h2>
          </div>
          <div className="col-sm-2 p-3">
            <div className="float-end" style={{ marginRight: "1rem" }}>
              <button
                type="button"
                className="btn icon-color btn-circle btn-lg"
              >
                <a href="create_event">
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    style={{ fontSize: "2.5rem" }}
                  ></i>
                </a>
              </button>
            </div>
          </div>
        </div>
        {/* {/* //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
        <div className="p-2">
          {console.log("kksksks: ", userdata)}
          <Tables userdata={userdata} />
        </div>
        {/* {/* //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
      </div>
      <div className="min-height-bottom"></div>

      {/* <!-- Footer --> */}
      <Footer />
    </div>
  );
};

export default Event;
