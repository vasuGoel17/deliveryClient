import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Tables = ({ userdata }) => {
  const refreshPage = () => {
    window.location.reload(false);
  };

  const handleDelete = async (e) => {
    console.log("e: ", e._id);
    const id = e._id;
    if (e.weight) {
      console.log("delivery wala");
      const res = await fetch("/api/deleted", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: e._id,
        }),
      });
      const data = await res.json();
      if (data.status === 200) {
        // const newlist = list.filter((li) => li.id !== id);
        console.log("deleted");
        refreshPage();
      } else {
        console.log("error in deleting the data ", data);
      }
    } else {
      console.log("travel wala");
      const res = await fetch("/api/deletet", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: e._id,
        }),
      });
      const data = await res.json();
      if (data.status === 200) {
        console.log("deleted");
        refreshPage();
        // const newlist = list.filter((li) => li.id !== id);
      } else {
        console.log("error in deleting the data");
      }
    }
  };

  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr className="table-dark">
            <th></th>
            <th>Name</th>
            <th>Start Location</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Car Name</th>
            <th>Car Number</th>
            <th>Package Weight</th>
            <th>Package Size</th>
          </tr>
        </thead>
        <tbody id="field_table">
          {userdata.length > 0 ? (
            userdata.map((element, index) => {
              return (
                <tr key={element._id}>
                  <td>
                    <button
                      style={{ border: "none", backgroundColor: "white" }}
                      onClick={() => {
                        handleDelete(element);
                      }}
                    >
                      <i className="fa-sharp fa-solid fa-trash"></i>
                    </button>
                  </td>
                  <td>{element.name}</td>
                  <td>{element.startlocation}</td>
                  <td>{element.endlocation}</td>
                  <td>{element.date}</td>
                  <td>
                    {element.carname ? (
                      element.carname
                    ) : (
                      <div style={{ fontSize: "1.4rem", marginLeft: "2rem" }}>
                        -
                      </div>
                    )}
                  </td>
                  <td>
                    {element.carnumber ? (
                      element.carnumber
                    ) : (
                      <div style={{ fontSize: "1.4rem", marginLeft: "2rem" }}>
                        -
                      </div>
                    )}
                  </td>
                  <td>
                    {element.weight ? (
                      element.weight
                    ) : (
                      <div style={{ fontSize: "1.4rem", marginLeft: "2rem" }}>
                        -
                      </div>
                    )}
                  </td>
                  <td>
                    {element.size ? (
                      element.size
                    ) : (
                      <div style={{ fontSize: "1.4rem", marginLeft: "2rem" }}>
                        -
                      </div>
                    )}
                  </td>
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
  );
};

export default Tables;
