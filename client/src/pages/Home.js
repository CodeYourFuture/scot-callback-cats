import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainTable from "../Component/MainTable";
import SMSModal from "../Component/SMSModal";

import "./Home.css";



export function Home() {
	const [message, setMessage] = useState("Loading...");
	const [checkedCheckboxes, setChecked] = useState([]);

	const onHandleSelectedUserState = (isSelected, userID ) => {
		if (isSelected === true) {
			checkedCheckboxes.push(userID);
			setChecked([...checkedCheckboxes]);
		} else {
			const index = checkedCheckboxes.findIndex((id) => id === userID);
			checkedCheckboxes.splice(index, 1);
			setChecked([...checkedCheckboxes]);
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
	}, []);
console.log(checkedCheckboxes);
	return (
		<main role="main">
			<MainTable checkedCheckboxes={checkedCheckboxes} onHandleSelectedUserState={onHandleSelectedUserState} />
			<SMSModal checkedCheckboxes={checkedCheckboxes} />
		</main>
	);
}

export default Home;
