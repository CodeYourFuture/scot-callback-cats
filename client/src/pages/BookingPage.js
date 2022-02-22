import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import camelCase from "lodash/camelCase";
import Alert from "react-bootstrap/Alert";
import  Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./BookingPage.css";

const times = [
	{ text: "10:30", value: "10:30" },
	{ text: "11:00", value: "11:00" },
	{ text: "11:30", value: "11:30" },
	{ text: "12:00", value: "12:00" },
	{ text: "12:30", value: "12:30" },
	{ text: "13:00", value: "13:00" },
	{ text: "13:30", value: "13:30" },
];

const convertPropertiesToCamelCase = (client) => {
	const clientCamelCased = {};
	Object.keys(client).forEach((key) => {
		clientCamelCased[camelCase(key)] = client[key];
	});
	return clientCamelCased;
};

function BookingPage() {
	const [clientData, setClientData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

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
		const payload = convertPropertiesToCamelCase(clientData);
		const dateTime = `${date}T${time}:00.000Z`;
		payload.pickUpDate = dateTime;
		payload.bookingStatus = 3;

		fetch(`/api/clients/${clientData.client_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		}).then(() => {
			setIsSuccess(true);
			// location.reload();
		});
	};

	const handleDateChange = (event) => {
		setDate(event.target.value);
	};

	const handleTimeChange = (event) => {
		setTime(event.target.value);
	};

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
		<>
		<Navbar className="full-width" sticky="top" expand="sm" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="https://www.bikesforrefugees.scot/">Bikes for Refugees</Navbar.Brand>
			</Container>
		</Navbar>
		<div>
			{isSuccess && (
				<Alert
					variant="success"
					onClose={() => setIsSuccess(false)}
					dismissible
				>
					{" "}
					Your booking has been made! You will receive a reminder closer to your chosen collection date.
				</Alert>
			)}
			<h1 className="mt-3 mb-4">Book a time to pick up bikes</h1>
			<h2 className="my-2">{clientData.name}</h2>
			<p className="mb-0">Phone number: {clientData.phone_number}</p>
			<p className="pt-0">Bikes requested: {clientData.bikes_needed}</p>
			<Form onSubmit={handleSubmit} variant="success">
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

				<Button type="submit" variant="dark" className="me-1 btn-on-hover fw-bold">
					Confirm time
				</Button>
			</Form>
		</div>
		</>
	);
}

export default BookingPage;
