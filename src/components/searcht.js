import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer";

const Searcht = () => {
  const location = useLocation();
  let arr = location.state.show;
  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100%" }}>
      <Navbar />
      <div className="container shadow-container min-height-con mt-5 overflow-hidden round-edge">
        <div className="row bg-dark text-white">
          <div className="col-sm-8 p-3">
            <h2>Deliveries</h2>
          </div>
        </div>
        <div className="p-2">
          <table className="table">
            <thead className="thead-dark">
              <tr className="table-dark">
                <th>Name</th>
                <th>Contact</th>
                <th>Start Location</th>
                <th>Destination</th>
                <th>Date</th>
                <th>Car's Name</th>
                <th>Car's Number</th>
              </tr>
            </thead>
            <tbody id="field_table">
              {arr.length > 0 ? (
                arr.map((element, index) => {
                  return (
                    <tr key={element._id}>
                      <td>{element.name}</td>
                      <td>{element.number}</td>
                      <td>{element.startlocation}</td>
                      <td>{element.endlocation}</td>
                      <td>{element.date}</td>
                      <td>{element.carname}</td>
                      <td>{element.carnumber}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>
                    <div style={{ textAlign: "center" }}>No Data Found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="min-height-bottom"></div>
      <Footer />
    </div>
  );
};

export default Searcht;
