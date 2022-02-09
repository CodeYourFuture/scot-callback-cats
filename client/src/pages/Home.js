import MainTable from "../Component/MainTable";
import SMSModal from "../Component/SMSModal";
import "./Home.css";
import React, { useState, useEffect } from "react";



export function Home() {
	const [selectedClients, setselectedClients] = useState([]);
	const [clientData, setClientData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);


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
				setselectedClients([]);
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
			setselectedClients((previousselectedClients) => {
				return previousselectedClients.concat(clientId);
			});
		} else {
			setselectedClients((previousselectedClients) => {
				return previousselectedClients.filter((id) => clientId !== id);
			});
		}
	};

	const onSMSSent = () =>  {
		loadClientData();
	};

	return (
		<main role="main">
			<MainTable selectedClients={selectedClients} onHandleSelectedUserState={onHandleSelectedUserState} clientData={clientData} error={error} isLoading={isLoading} />
			<SMSModal selectedClients={selectedClients} onSMSSent={onSMSSent} />
		</main>
	);

}
export default Home;
