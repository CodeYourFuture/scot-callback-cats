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
		<div className="container py-5">
			<div className="p-4  bg-dark rounded-3 no-border">
				{" "}
				<h2 className="text-light bg-dark">Bike pick-up calendar</h2>
			</div>
			{bookingsData.map((data) => {
				return (
					<React.Fragment key={data.client_id}>
						<div className="table-responsive-xxl ">
							<table className="table align-middle table-striped table-hover">
								<caption className="visually-hidden">Clients</caption>
								<thead className="table-dark">
									<tr>
										<th scope="col">Date</th>
										<th scope="col">Name</th>
										<th scope="col">Amount of Bikes</th>
									</tr>
								</thead>
								<tbody>
								<tr key={data.client_id}>
                                    <td>
                                        {new Date(data.pick_up_date).toLocaleString("en-US", {
                                            weekday: "long",
                                        })}
                                        <span className="pe-0.5"> </span>
                                        {new Date(data.pick_up_date).toLocaleString("en-US", {
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td>{data.name}</td>
                                    <td>{data.bikes_needed}</td>
                                </tr>
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
