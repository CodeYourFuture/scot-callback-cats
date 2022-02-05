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
			<div className="d-flex justify-content-center">
				{bookingsData.map((date, index) => {
					return (
						<div key={index} className="">
							<div className="card" style={{ width: "18rem"}}>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<div>{date.name}</div>
										<div>{new Date(date.pick_up_date).toLocaleString()}</div>
										<div> Bikes amount {date.bikes_needed}</div>
									</li>
								</ul>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Calendar;
