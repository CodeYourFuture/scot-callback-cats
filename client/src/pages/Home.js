import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import logo from "./logo.svg";

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
				{/* <img
					className="logo"
					data-qa="logo"
					src={logo}
					alt="Just the React logo"
				/>
				<h1 className="message" data-qa="message">
					{message}
				</h1> */}
				<div className="container ">
				<ul className="list-group list-group-flush">
					<li className="list-group-item list-group-item-action">
						<Link to="/about/this/site">About</Link>
					</li>
					<li className="list-group-item list-group-item-action">
						<Link to="/MainTable/this/site">Clients</Link>
					</li>
				</ul>
				</div>
			</div>
		</main>
	);
}

export default Home;
