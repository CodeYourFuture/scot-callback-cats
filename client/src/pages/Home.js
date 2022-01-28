import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainTable from "../Component/MainTable";

import "./Home.css";

export function Home() {
	const [message, setMessage] = useState("Loading...");

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

	return (
		<main role="main">
			<div>

				<h1 className="message" data-qa="message">
					{message}
				</h1>
				<Link to="/about/this/site">About</Link>
				<div>
					<Link to="/UploadFile/">Files Page</Link>
				</div>
			</div>
			<MainTable />
		</main>
	);
}

export default Home;
