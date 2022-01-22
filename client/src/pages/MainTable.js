import React, { useState, useEffect } from "react";

const MainTable = () => {
  console.log("Page Uploaded");
  const [clientData, SetClientData] = useState ();
  const [error, setError] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState (null);

  useEffect(() => {
    fetch("http://localhost:3100/api/clients")
      .then((response) => {
        if (!response.ok) {
          throw Error("We could not fetch the data for that resource");
          }
          return response.json();
        })
      .then((data) => {
        console.log(data,"After ");
        SetClientData(data);
        console.log(clientData, "Data from useState");
        setError(null);
      })
      .catch((err) => {
              console.log("error message: ", err.message);
              setError(err.message);
      });
  }, []);

  console.log(clientData, "outside of fetch");
  return (
    <div className="container">
      <table className="table table-sm table-striped table-hover">
        {/* <caption>List of users</caption> */}
        <thead>
          <tr>
            <th scope="col">Client Id</th>
            <th scope="col">Added</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Bikes needed</th>
            <th scope="col">Booking status</th>
            <th scope="col">Residency status</th>
            <th scope="col">Country of origin</th>
            <th scope="col">Time in Scotland</th>
            <th scope="col">Language spoken</th>
            <th scope="col">English speaker</th>
            <th scope="col">English skill level</th>
            <th scope="col">Gender</th>
            <th scope="col">DOB</th>
            <th scope="col">Postcode</th>
            <th scope="col">Referring agency</th>
          </tr>
        </thead>
        <tbody className="table-striped">
          {clientData.map((client) => {
            return (
              <tr key={client.client_id} className={
                selectedClientId === client.client.id ? "table-warning" : ""
                }
                onClick={() =>
                setSelectedClientId(
                  client.client.id === selectedClientId ? null : client.client.id
                )
                }>
                <td>{client.client_id}</td>
                <td>{client.date_added}</td>
                <td>{client.name}</td>
                <td>{client.phone_number}</td>
                <td>{client.bikes_needed}</td>
                <td>{client.booking_status}</td>
                <td>{client.residency_status}</td>
                <td>{client.country_of_origin}</td>
                <td>{client.time_in_scotland}</td>
                <td>{client.english_speaker}</td>
                <td>{client.english_skill_level}</td>
                <td>{client.gender}</td>
                <td>{client.date_of_birth}</td>
                <td>{client.postcode}</td>
                <td>{client.referring_agency}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
