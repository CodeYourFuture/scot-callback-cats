import React, { Fragment } from "react";
import "./MainTableStyle.css";
import Alert from "react-bootstrap/Alert";
import Checkbox from "./Checkbox.js";

const bookingStatus = {
	1: "Waiting",
	2: "Contacted",
	3: "Booked",
	4: "Declined",
	5: "Completed",
	6: "Canceled",
};
const residencyStatus = {
	1: "Asylum Seeker",
	2: "Refugee",
	3: "Unaccompanied minor",
	4: "Destitute/Failed asylum",
};

const bookingStatusStyle = {
	1: "badge rounded-pill bg-secondary",
	2: "badge rounded-pill bg-warning text-dark",
	3: "badge rounded-pill bg-success",
	4: "badge rounded-pill bg-danger",
};

const arrowPositionUp = (
	<path d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
);
const arrowPositionDown = (
	<path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path>
);

const MainTable = (props) => {
	if (props.isLoading) {
		return (
			<div className="d-flex justify-content-center">
				<div className="spinner-grow">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}
	if (props.error != null) {
		return <Alert variant="danger">{props.error}</Alert>;
	}

	const validDate = (value) => {
		if (value === null) {
			return "";
		} else {
			return new Date(value).toLocaleDateString();
		}
	};

	const speakEnglish = (value) => {
		if (value === true) {
			return "Yes";
		} else if (value === false) {
			return "No";
		} else {
			return "";
		}
	};

	return (
		<div className="table-responsive pt-3">
			<table className="table align-middle table-hover text-nowrap border">
				<caption className="visually-hidden">Clients</caption>
				<thead className="table-secondary border rounded-top">
					<tr>
						<th scope="col rounded-start">#</th>
						<th scope="col">Id</th>
						<th scope="col">Added</th>
						<th scope="col">Name</th>
						<th scope="col">Phone</th>
						<th scope="col">Bikes needed</th>
						<th scope="col">Booking status</th>
						<th scope="col">Pick up date</th>
					</tr>
				</thead>
				<tbody>
					{props.clientData.map((client, i) => {
						return (
							<Fragment key={client.client_id}>
								<tr>
									<td className="">
										<Checkbox
											isChecked={props.selectedClients.includes(
												client.client_id
											)}
											label={client.name}
											onChange={(checked) =>
												props.onHandleSelectedUserState(
													checked,
													client.client_id
												)
											}
										/>
									</td>
									<td>{client.client_id}</td>
									<td>{new Date(client.date_added).toLocaleDateString()}</td>
									<td className="fw-bold d-flex justify-content-start align-items-center">
										<div className="fs-4 me-3">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												viewBox="0 0 16 16"
												onClick={() => {
													props.showOnClientInfoClick(i);
												}}
												cursor="pointer"
											>
												{props.isHiden === i
													? arrowPositionDown
													: arrowPositionUp}
											</svg>
										</div>
										<span>{client.name}</span>
									</td>
									<td>{client.phone_number}</td>
									<td className="align-bikes-needed">{client.bikes_needed}</td>
									<td className="fs-5">
										<span className={bookingStatusStyle[client.booking_status]}>
											{bookingStatus[client.booking_status]}
										</span>
									</td>
									<td>{validDate(client.pick_up_date)}</td>
								</tr>
								<tr>
									<td
										colSpan="9"
										style={
											props.isHiden === i
												? { display: "table-cell" }
												: { display: "none" }
										}
									>
										<ul className="list-group">
											<li className="list-group-item list-group-item-action hiden-rows-columns">
												<span className="fw-bold">Residence status |</span>
												<span> {residencyStatus[client.residency_status]}</span>
											</li>
											<li className="list-group-item list-group-item-action">
												<span className="fw-bold">Country of origin |</span>
												<span> {client.country_of_origin}</span>
											</li>
											<li className="list-group-item list-group-item-action">
												<span className="fw-bold">Time in Scotland |</span>
												<span> {client.time_in_scotland}</span>
											</li>
											<li className="list-group-item list-group-item-action">
												<span className="fw-bold">Language spoken |</span>
												<span> {client.language_spoken}</span>
											</li>
											<li className="list-group-item list-group-item-action">
												<span className="fw-bold">English speaker |</span>
												<span> {speakEnglish(client.english_speaker)}</span>
											</li>
											<li className="list-group-item list-group-item-action">
												<span className="fw-bold">Skill Level |</span>
												<span> {client.english_skill_level}</span>
											</li>
											<li className="list-group-item list-group-item-action">
												<span className="fw-bold">Gender |</span>
												<span> {client.gender}</span>
											</li>
											<li className="list-group-item list-group-item-action">
												<span className="fw-bold">Date of birth |</span>
												<span> {validDate(client.date_of_birth)}</span>
											</li>
											<li className="list-group-item list-group-item-action">
												<span className="fw-bold">Postcode |</span>
												<span> {client.postcode} {client.referring_agency}</span>
											</li>
										</ul>
									</td>
								</tr>
							</Fragment>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default MainTable;
