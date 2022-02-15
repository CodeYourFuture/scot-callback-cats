import { Route, Switch, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import BookingPage from "./pages/BookingPage";
import NavbarComponent from "./Component/NavbarComponent";
import { Container } from "react-bootstrap";
import Messages from "./pages/Messages";


const App = () => {
	const location = useLocation();
	console.log(location);
	return (
		<>
			{location.pathname.startsWith("/book/") ||
				location.pathname.startsWith("/Login") ? null : (
				<NavbarComponent />
			)}

			<Container>
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/Login">
						<Login />
					</Route>
					<Route path="/calendar">
						<Calendar />
					</Route>
					<Route path="/book/:uuid">
						<BookingPage />
					</Route>
					<Route path="/messages">
						<Messages />
					</Route>
				</Switch>
			</Container>
		</>
	);
};

export default App;
