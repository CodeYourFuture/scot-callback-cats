import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import BookingPage from "./pages/BookingPage";
import NavbarComponent from "./Component/NavbarComponent";
import { Container } from "react-bootstrap";

const App = () => (
	<>
		<NavbarComponent />
		<Container>
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/calendar">
					<Calendar />
				</Route>
				<Route path="/book/:uuid">
					<BookingPage />
				</Route>
			</Switch>
		</Container>
	</>
);

export default App;
