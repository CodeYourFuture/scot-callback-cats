import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import "./Calendar.css";

const isSameDate = (dateA, dateB) => {
	return 	new Date(dateA).toDateString() === new Date(dateB).toDateString();
};

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
		const existingPickUpDate = pickUpDates.find((el) => isSameDate(el.date, client.pick_up_date));
		if (existingPickUpDate) {
			existingPickUpDate.clients.push(client);
			existingPickUpDate.clients.sort((a, b) => new Date(a.pick_up_date) - new Date(b.pick_up_date));
		} else {
			pickUpDates.push({ date: client.pick_up_date, clients: [client] });
		}
	});
	pickUpDates.sort((a, b) => new Date(a.date) - new Date(b.date));

	const now = new Date().toLocaleString("en-GB", {
		weekday: "long",
		month: "long",
		day: "numeric",
		});


	const today = new Date();
	const twoWeeksFromNow = today.setDate(today.getDate() + 14);



	return (
		<div className="py-3">
			<h1 className="text-dark">Bike pick-up calendar</h1>
			<p>Showing appointments between {now} and {new Date(twoWeeksFromNow).toLocaleString("en-GB", {
		weekday: "long",
		month: "long",
		day: "numeric",
		})} </p>
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
							<table className="table calendar-table align-middle table-striped table-hover caption-top">
								<caption className="visually-hidden">Clients</caption>
								<thead className="table-dark">
									<tr>
										<th scope="col">Time</th>
										<th scope="col">Name</th>
										<th scope="col">Bikes requested</th>
										<th scope="col">Phone number</th>
									</tr>
								</thead>
								<tbody>
									{data.clients.map((client) => {
										return (
											<tr key={client.client_id}>
												<td>
													{new Date(client.pick_up_date).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true })}
													</td>
												<td>{client.name}</td>
												<td>{client.bikes_needed}</td>
												<td>{client.phone_number}</td>
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
