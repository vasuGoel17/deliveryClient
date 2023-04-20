import React from "react";

const Tabled = ({ userdatad }) => {
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
            <th>Package Weight</th>
            <th>Package Size</th>
          </tr>
        </thead>
        <tbody id="field_table">
          {userdatad.length > 0 ? (
            userdatad.map((element, index) => {
              return (
                <tr key={element._id}>
                  <td>{element.name}</td>
                  <td>{element.number}</td>
                  <td>{element.startlocation}</td>
                  <td>{element.endlocation}</td>
                  <td>{element.date}</td>
                  <td>{element.weight}</td>
                  <td>{element.size}</td>
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

export default Tabled;
