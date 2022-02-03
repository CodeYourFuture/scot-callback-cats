import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainTable from "../Component/MainTable";
import SMSModal from "../Component/SMSModal";

import "./Home.css";



export function Home() {
	const [message, setMessage] = useState("Loading...");
	const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

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

	useEffect(() => {
		fetch("/api")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body.message);
			})
			.catch((err) => {
				console.error(err);
			});
		}, 	[]);

	return (
		<main role="main">
			<MainTable checkedCheckboxes={checkedCheckboxes} onHandleSelectedUserState={onHandleSelectedUserState} />
			<SMSModal checkedCheckboxes={checkedCheckboxes} />
		</main>
	);

}
export default Home;
