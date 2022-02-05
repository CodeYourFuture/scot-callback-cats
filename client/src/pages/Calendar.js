import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

const Calendar = () => {
	const [bookingsData, setBookingsData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch("/api/bookings?filter=2weeks")
			.then((response) => {
				if (!response.ok) {
					throw Error(
						"There was an error getting the calendar data, Please try again"
					);
				}
				return response.json();
			})
			.then((data) => {
				setBookingsData(data);
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
		<div className="container">
		<div className="table-responsive-xxl">
			<table className="table align-middle  table-striped table-hover styled-table border">
				<caption className="visually-hidden">Clients</caption>
				<thead className="table-dark">
					<tr>
						<th scope="col">Date</th>
						<th scope="col">Name</th>
						<th scope="col">Amount of Bikes</th>
					</tr>
				</thead>
				<tbody>
					{bookingsData.map((data) => {
						return (
							<tr key={data.client_id}>
								<td>{new Date(data.pick_up_date).toLocaleString("en-US", { day: "numeric", weekday: "long" })}</td>
								<td>{data.name}</td>
								<td>{data.gender}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
		</div>
	);
};

export default Calendar;
