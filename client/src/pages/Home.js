import MainTable from "../Component/MainTable";
import SMSModal from "../Component/SMSModal";
import "./Home.css";
import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";



export function Home() {
	const [selectedClients, setSelectedClients] = useState([]);
	const [clientData, setClientData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isFailure, setIsFailure] = useState(false);


	const loadClientData = () => {
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
				setSelectedClients([]);
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		loadClientData();
	}, []);

	const onHandleSelectedUserState = (isSelected, clientId ) => {
		if (isSelected) {
			setSelectedClients((previousSelectedClients) => {
				return previousSelectedClients.concat(clientId);
			});
		} else {
			setSelectedClients((previousSelectedClients) => {
				return previousSelectedClients.filter((id) => clientId !== id);
			});
		}
	};

	const onSMSSent = () =>  {
		loadClientData();
		setIsSuccess(true);
	};

	const onSMSFailed = () => {
		loadClientData();
		setIsFailure(true);
	};

	return (
		<main role="main">
			{isSuccess &&
				<Alert variant="success" onClose={() => setIsSuccess(false)} dismissible> Message sent!</Alert>}
			{isFailure &&
				<Alert variant="danger" onClose={() => setIsFailure(false)} dismissible> Something went wrong! </Alert>}
			<SMSModal selectedClients={selectedClients} onSMSFailed={onSMSFailed} onSMSSent={onSMSSent} />
			<MainTable selectedClients={selectedClients} onHandleSelectedUserState={onHandleSelectedUserState} clientData={clientData} error={error} isLoading={isLoading} />
		</main>
	);

}
export default Home;
