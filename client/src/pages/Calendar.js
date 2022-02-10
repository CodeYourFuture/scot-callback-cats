import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import "./Calendar.css";

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
						"There was an error getting the calendar data. Please try again."
					);
				}
				return response.json();
			})
			.then((data) => {
				setBookingsData(data);
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
// Each element has the structure { date: Date, clients: [] }
	const pickUpDates = [];

	bookingsData.forEach((client) => {
		let found = pickUpDates.find((element) => element.date == client.pick_up_date);
		if (found) {
			found.clients.push(client);
			found.clients.sort((a, b) => new Date(a.pick_up_date) - new Date(b.pick_up_date));
		} else {
			pickUpDates.push({ date: client.pick_up_date, clients: [client] });
		}
	});
	pickUpDates.sort((a, b) => new Date(a.date) - new Date(b.date));

	return (
		<div className="container py-5">
			<div className="p-4  bg-dark rounded-3 no-border">
				{" "}
				<h1 className="text-light bg-dark">Bike pick-up calendar</h1>
			</div>
			{pickUpDates.map((data) => {
				return (
					<React.Fragment key={data.date}>
						<h2 className="mt-4">
							{new Date(data.date).toLocaleString("en-GB", {
								weekday: "long",
								month: "long",
								day: "numeric",
							})}
						</h2>
						<div className="table-responsive-xxl ">
							<table id="fixing-width" className="table align-middle table-striped table-hover caption-top">
								<caption className="visually-hidden">Clients</caption>
								<thead className="table-dark">
									<tr>
										<th scope="col">Time</th>
										<th scope="col">Name</th>
										<th scope="col">Amount of Bikes</th>
									</tr>
								</thead>
								<tbody>
									{data.clients.map((client) => {
										return (
											<tr key={client.client_id}>
												<td>
													{new Date(data.date).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true })}
													</td>
												<td>{client.name}</td>
												<td>{client.bikes_needed}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default Calendar;
