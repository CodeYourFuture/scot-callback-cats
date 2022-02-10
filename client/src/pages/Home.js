import React, { useState } from "react";
import MainTable from "../Component/MainTable";
import SMSModal from "../Component/SMSModal";
import "./Home.css";

export function Home() {
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


	return (
		<main role="main">
			<MainTable checkedCheckboxes={checkedCheckboxes} onHandleSelectedUserState={onHandleSelectedUserState} />
			<SMSModal checkedCheckboxes={checkedCheckboxes} />
		</main>
	);

}
export default Home;
