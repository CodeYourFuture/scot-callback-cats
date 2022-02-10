import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import NavbarComponent from "./Component/NavbarComponent";

const App = () => (
	<Route>
		<NavbarComponent />
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
		</Switch>
	</Route>
);

export default App;
