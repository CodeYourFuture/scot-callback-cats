import React, { useState, useEffect } from "react";
import "./MainTableStyle.css";
import Alert from "react-bootstrap/Alert";

const MainTable = () => {
	const [clientData, setClientData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch("/api/clients")
			.then((response) => {
				if (!response.ok) {
					throw Error(
						"There was an error getting the customer data, Please try again"
					);
				}
				return response.json();
			})
			.then((data) => {
				setClientData(data);
				setError(null);
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center">
				<div className="spinner-grow">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}
	if (error != null) {
		return <Alert variant="danger">{error}</Alert>;
	}
	return (
		<div className="table-responsive-xxl">
			<table className="table align-middle  table-striped table-hover styled-table border">
				<caption className="visually-hidden">Clients</caption>
				<thead className="table-dark">
					<tr>
						<th scope="col">Id</th>
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
						<th scope="col">Pick up date</th>
						<th scope="col">Decline</th>
					</tr>
				</thead>
				<tbody>
					{clientData.map((client) => {
						return (
							<tr key={client.client_id}>
								<td>{client.client_id}</td>
								<td>{new Date(client.date_added).toLocaleString()}</td>
								<td>{client.name}</td>
								<td>{client.phone_number}</td>
								<td>{client.bikes_needed}</td>
								<td>{client.booking_status}</td>
								<td>{client.residency_status}</td>
								<td>{client.country_of_origin}</td>
								<td>{client.time_in_scotland}</td>
								<td>{client.language_spoken}</td>
								<td>{client.english_speaker}</td>
								<td>{client.english_skill_level}</td>
								<td>{client.gender}</td>
								<td>{new Date(client.date_of_birth).toLocaleDateString()}</td>
								<td>{client.postcode}</td>
								<td>{client.referring_agency}</td>
								<td>{new Date(client.pick_up_date).toLocaleDateString()}</td>
								<td>{client.is_decline}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default MainTable;
