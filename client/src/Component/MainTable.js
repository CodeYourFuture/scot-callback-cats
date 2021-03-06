import React from "react";
import "./MainTableStyle.css";
import Alert from "react-bootstrap/Alert";
import Pagination from "react-bootstrap/Pagination";
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
			return	"";
		}else {
			return new Date(value).toLocaleDateString();
    }
};

	const speakEnglish = (value) => {
		if (value === true) {
			return	"Yes";
		}else if (value === false){
			return "No";
		}else{
			return "";
	}
};


	return (
		<div className="table-responsive pt-3">
			<table className="table align-middle table-hover text-nowrap">
				<caption className="visually-hidden">Clients</caption>
				<thead className="table-secondary">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Id</th>
						<th scope="col">Added</th>
						<th scope="col">Name</th>
						<th scope="col">Phone</th>
						<th scope="col">Bikes needed</th>
						<th scope="col">Booking status</th>
						<th scope="col">Pick up date</th>
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
				<tbody>
					{props.clientData.map((client) => {
						return (
							<tr key={client.client_id}>
								<td>
									<Checkbox
										isChecked={props.selectedClients.includes(client.client_id)}
										label={client.name}
										onChange={(checked) => props.onHandleSelectedUserState(checked, client.client_id)}
									/>
								</td>
								<td>{client.client_id}</td>
								<td>{new Date(client.date_added).toLocaleDateString()}</td>
								<td className="fw-bold">{client.name}</td>
								<td>{client.phone_number}</td>
								<td className="align-bikes-needed">{client.bikes_needed}</td>
								<td className="fs-5"><span className={bookingStatusStyle[client.booking_status]}>{bookingStatus[client.booking_status]}</span></td>
								<td>{validDate(client.pick_up_date)}</td>
								<td>{residencyStatus[client.residency_status]}</td>
								<td>{client.country_of_origin}</td>
								<td>{client.time_in_scotland}</td>
								<td>{client.language_spoken}</td>
								<td>{speakEnglish(client.english_speaker)}</td>
								<td>{client.english_skill_level}</td>
								<td>{client.gender}</td>
								<td>{validDate(client.date_of_birth)}</td>
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
