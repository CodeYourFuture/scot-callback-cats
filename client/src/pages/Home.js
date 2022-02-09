import MainTable from "../Component/MainTable";
import SMSModal from "../Component/SMSModal";
import "./Home.css";
import React, { useState, useEffect } from "react";



export function Home() {
	const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
	const [clientData, setClientData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);


	const loadUserData = () => {
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
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		loadUserData();
	}, []);

	const onHandleSelectedUserState = (isSelected, clientId ) => {
		if (isSelected) {
			setCheckedCheckboxes((previousCheckedCheckboxes) => {
				return previousCheckedCheckboxes.concat(clientId);
			});
		} else {
			setCheckedCheckboxes((previousCheckedCheckboxes) => {
				return previousCheckedCheckboxes.filter((id) => clientId !== id);
			});
		}
	};

	const onSMSSent = () =>  {
		loadUserData();
	};

	return (
		<main role="main">
			<MainTable checkedCheckboxes={checkedCheckboxes} onHandleSelectedUserState={onHandleSelectedUserState} clientData={clientData} error={error} isLoading={isLoading} />
			<SMSModal checkedCheckboxes={checkedCheckboxes} onSMSSent={onSMSSent} />
		</main>
	);

}
export default Home;
