import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";

const App = () => (
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
);

export default App;