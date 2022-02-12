import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const times = [
	{ text: "10:30", value: "10:30" },
	{ text: "11:00", value: "11:00" },
	{ text: "11:30", value: "11:30" },
	{ text: "12:00", value: "12:00" },
	{ text: "12:30", value: "12:30" },
	{ text: "13:00", value: "13:00" },
	{ text: "13:30", value: "13:30" },
];

function BookingPage() {
	const [clientData, setClientData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	const urlParams = useParams();

	useEffect(() => {
		setIsLoading(true);
		fetch(`/api/clients?uuid=${urlParams.uuid}`)
			.then((response) => {
				if (!response.ok) {
					throw Error(
						"There was an error getting the client data"
					);
				}
				return response.json();
			})
			.then((data) => {
				setClientData(data[0]);
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [urlParams.uuid]);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(date, time);
	};

	const handleDateChange = (event) => {
		setDate(event.target.value);
	};

	const handleTimeChange = (event) => {
		setTime(event.target.value);
	};

	return (
		<div>
			<h1 className="my-3">Book a time to pick up bikes</h1>
			<h3>{clientData.name}</h3>
			<h3>{clientData.phone_number}</h3>
			<h3>bikes needed: {clientData.bikes_needed}</h3>
			<Form onSubmit={handleSubmit}>
				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Pick-up date</Form.Label>
							<Form.Control type="date" onChange={handleDateChange} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>Pick-up time</Form.Label>
							<Form.Select
								aria-label="Default select example"
								onChange={handleTimeChange}
							>
								<option>Choose a time</option>
								{times.map((time) => {
									return <option key={time.value}>{time.text}</option>;
								})}
							</Form.Select>
						</Form.Group>
					</Col>
				</Row>

				<Button type="submit" variant="primary" className="me-1">
					Confirm time
				</Button>
				<Button variant="outline-danger">Decline bikes</Button>
			</Form>
		</div>
	);
}

export default BookingPage;
