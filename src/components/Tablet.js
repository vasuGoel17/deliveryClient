import React from "react";

const Tablet = ({ userdatat }) => {
  return (
    <div>
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
          {userdatat.length > 0 ? (
            userdatat.map((element, index) => {
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
  );
};

export default Tablet;
