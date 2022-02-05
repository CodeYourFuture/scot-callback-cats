import MainTable from "../Component/MainTable";
import "./Home.css";

export function Home() {
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
