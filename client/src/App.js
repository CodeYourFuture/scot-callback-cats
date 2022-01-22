import { Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import MainTable from "./pages/MainTable";

const App = () => (
	<Switch>
		<Route path="/" exact>
			<Home />
		</Route>
		<Route path="/about/this/site">
			<About />
		</Route>
		<Route path="/MainTable/this/site">
			<MainTable />
		</Route>
	</Switch>
);

export default App;
