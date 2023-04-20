import React from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import { addData } from "./context/ContextProvider";
import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import Tabled from "./Tabled";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Deleveries = () => {
  const { usernameadd, setusernameadd, numberadd, setnumberadd } =
    useContext(addData);
  const [userdatad, setuserdatad] = useState([]);
  const [search, setsearch] = useState({
    start: "",
    end: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setsearch((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const userget = async () => {
    let token = localStorage.getItem("userDataToken");
    const res = await fetch("/api/getuserd", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    });
    console.log("resssssss: ", res);
    const data = await res.json();
    console.log("dataaaaaa: ", data);
    let temp = [];

    for (let i = 0; i < data.usersdatad.length; i++) {
      temp.push(data.usersdatad[i]);
    }
    console.log("temp: ", temp);

    if (data.status === 200) {
      setuserdatad(temp);
    } else {
      console.log("error for get userdata");
    }
  };

  const handleClick = async () => {
    console.log("clicked");
    console.log("search: ", search);
    const data = await fetch("/api/searchd", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: search.start,
        end: search.end,
      }),
    });
    const res = await data.json();
    console.log("nayaaa res: ", res.show);
    if (res.status === 200 || !data) {
      navigate("/searchd", { state: { show: res.show } });
    } else {
      console.log("error in searching");
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
          <div className="col-sm-8 p-3">
            <h2>Deliveries</h2>
          </div>
          <div className="col-sm-4 p-3 search_container">
            <div className="float-end row" style={{ alignItems: "center" }}>
              <div className="col-md-5 align-items-center search_contentent">
                <div className="col-auto">
                  <input
                    type="Pickup Location"
                    className="form-control"
                    placeholder="Pickup Location"
                    name="start"
                    onChange={handleChange}
                    value={search.start}
                  />
                </div>
              </div>
              <div className="col-md-5 align-items-center search_contentent">
                <div className="col-auto">
                  <input
                    type="Destination Location"
                    className="form-control"
                    placeholder="Destination Location"
                    name="end"
                    onChange={handleChange}
                    value={search.end}
                  />
                </div>
              </div>
              <button
                type="button"
                className="col-md-2 btn icon-color btn-circle btn-lg search_contentent_button"
                style={{ paddingLeft: "0" }}
              >
                <i
                  className="fa fa-search"
                  aria-hidden="true"
                  style={{ fontSize: "1.9rem", color: "white" }}
                  onClick={handleClick}
                ></i>
              </button>
            </div>
          </div>
        </div>
        <div className="p-2">
          <Tabled userdatad={userdatad}></Tabled>
        </div>
      </div>
      <div className="min-height-bottom"></div>

      {/* <!-- Footer --> */}

      <Footer />
    </div>
  );
};

export default Deleveries;
