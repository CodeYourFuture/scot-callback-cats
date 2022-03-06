import React, { useState, useEffect } from "react";
import MainTable from "../Component/MainTable";
import SMSModal from "../Component/SMSModal";
import "./Home.css";
import Alert from "react-bootstrap/Alert";
import UploadFile from "./UploadFile";

export function Home() {
	const [selectedClients, setSelectedClients] = useState([]);
	const [clientData, setClientData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isFailure, setIsFailure] = useState(false);
	const [isUploadSuccess, setIsUploadSuccess] = useState(false);
	const [isUploadFailure, setIsUploadFailure] = useState(false);

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

	const onCsvFileSent = () =>  {
		loadClientData();
		setIsUploadSuccess(true);
	};

	const onCsvFileFailed = () => {
		loadClientData();
		setIsUploadFailure(true);
	};

	return (

		<main role="main">
			{isSuccess &&
				<Alert variant="success" onClose={() => setIsSuccess(false)} dismissible> Message sent!</Alert>}
			{isFailure &&
				<Alert variant="danger" onClose={() => setIsFailure(false)} dismissible> Something went wrong! </Alert>}
			{isUploadSuccess &&
				<Alert variant="success" onClose={() => setIsUploadSuccess(false)} dismissible> CSV file uploaded!</Alert>}
			{isUploadFailure &&
				<Alert variant="danger" onClose={() => setIsUploadFailure(false)} dismissible> Something went wrong during the upload! Please retry.</Alert>}
			<UploadFile onCsvFileSent={onCsvFileSent} onCsvFileFailed={onCsvFileFailed} />
			<SMSModal selectedClients={selectedClients} onSMSFailed={onSMSFailed} onSMSSent={onSMSSent} />
			<MainTable selectedClients={selectedClients} onHandleSelectedUserState={onHandleSelectedUserState} clientData={clientData} error={error} isLoading={isLoading} />
		</main>
	);

}
export default Home;
