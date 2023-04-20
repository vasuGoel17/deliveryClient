import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addData } from "./context/ContextProvider";
import Alert from "react-bootstrap/Alert";

const Create_event = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { usernameadd, setusernameadd, numberadd, setnumberadd } =
    useContext(addData);

  const [values, setValues] = useState({
    name: "",
    startlocation: "",
    endlocation: "",
    date: "",
  });

  const [valuesft, setValuesft] = useState({
    carname: "",
    carnumber: "",
  });
  const [valuesfd, setValuesfd] = useState({
    weight: "",
    size: "",
  });

  const [selectedOption, setSelectedOption] = useState("option1");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleDeliveryChange = (e) => {
    setValuesfd((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleTravelChange = (e) => {
    setValuesft((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    console.log("s: ", selectedOption);

    if (selectedOption === "option2") {
      console.log(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      );
      console.log("a: ", values);
      console.log("t: ", valuesft);
      console.log("yeah its option 2");
      const { name, startlocation, endlocation, date } = values;
      const { carname, carnumber } = valuesft;

      const data = await fetch("/api/event-travel", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameadd,
          number: numberadd,
          name: name,
          startlocation: startlocation,
          endlocation: endlocation,
          date: date,
          carname: carname,
          carnumber: carnumber,
        }),
      });
      const res = await data.json();

      console.log(res);
      console.log(res.status);
      if (res.status === 400 || !data) {
        // alert("this is not used, please register if you dont have an account");
        toast.error(
          "invalid userid, please register if you dont have an account"
        );
        console.log("invalid username");
      } else {
        toast.success("Your Details are added");
        setValues({
          ...values,
          name: "",
          startlocation: "",
          endlocation: "",
          date: "",
        });
        setValuesft({
          ...valuesft,
          carname: "",
          carnumber: "",
        });
        navigate("/event");
      }
    } else {
      console.log(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      );
      console.log("a: ", values);
      console.log("d: ", valuesfd);
      console.log("yeah its option 1");
      const { name, startlocation, endlocation, date } = values;
      const { weight, size } = valuesfd;

      const data = await fetch("/api/event-delivery", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameadd,
          number: numberadd,
          name: name,
          startlocation: startlocation,
          endlocation: endlocation,
          date: date,
          weight: weight,
          size: size,
        }),
      });
      const res = await data.json();

      console.log(res);
      console.log(res.status);
      if (res.status === 400 || !data) {
        // alert("this is not used, please register if you dont have an account");
        toast.error(
          "invalid userid, please register if you dont have an account"
        );
        console.log("invalid username");
      } else {
        toast.success("Your Details are added");
        setValues({
          ...values,
          name: "",
          startlocation: "",
          endlocation: "",
          date: "",
        });
        setValuesfd({
          ...valuesfd,
          weight: "",
          size: "",
        });
        navigate("/event");
      }
    }
  };

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
      {/* <div /> */}
      <div className="container shadow-container min-height-con mt-5 overflow-hidden round-edge">
        <div className="row bg-dark text-white">
          <div className="col-sm-7 p-3">
            <h2>Create</h2>
          </div>
        </div>
        <div className="p-2 mt-3">
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label className="form-label" style={{ width: "200px" }}>
                    Your Name
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Your Name"
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label className="form-label" style={{ width: "200px" }}>
                    Event Name
                  </label>
                </div>
                <div className="col-auto">
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    style={{ width: "200px" }}
                    value={selectedOption}
                    onChange={handleSelectChange}
                    required
                    name="event"
                  >
                    <option value="option1">Delivery</option>
                    <option value="option2">Travelling</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label className="form-label" style={{ width: "200px" }}>
                    Start Location
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    type="filePath"
                    className="form-control"
                    name="startlocation"
                    value={values.startlocation}
                    placeholder="Start Location"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label className="form-label" style={{ width: "200px" }}>
                    Destination Location
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    type="filePath"
                    className="form-control"
                    name="endlocation"
                    placeholder="Destination Location"
                    value={values.endlocation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label className="form-label" style={{ width: "200px" }}>
                    Date
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    placeholder="Package Weight"
                    value={values.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            {selectedOption === "option1" && (
              <div>
                <div className="mb-3">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label className="form-label" style={{ width: "200px" }}>
                        Package Weight{" "}
                        <span style={{ fontSize: "small" }}>(in kgs)</span>
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="number"
                        className="form-control"
                        name="weight"
                        value={valuesfd.weight}
                        placeholder="Package Weight"
                        onChange={handleDeliveryChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label className="form-label" style={{ width: "200px" }}>
                        Package Size{" "}
                        <span style={{ fontSize: "small" }}>(in inches)</span>
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="number"
                        className="form-control"
                        name="size"
                        value={valuesfd.size}
                        placeholder="Package Size"
                        onChange={handleDeliveryChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedOption === "option2" && (
              <div>
                <div className="mb-3">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label className="form-label" style={{ width: "200px" }}>
                        Car's Name
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        name="carname"
                        value={valuesft.carname}
                        placeholder="Car Name"
                        onChange={handleTravelChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label className="form-label" style={{ width: "200px" }}>
                        Car's Number
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        name="carnumber"
                        value={valuesft.carnumber}
                        placeholder="Car Number"
                        onChange={handleTravelChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
      <div className="min-height-bottom"></div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Create_event;
