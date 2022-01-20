import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Signup from "./pages/Signup";




const App = () => (
	<Switch>
		<Route path="/" exact>
			<Home />
		</Route>
		<Route path="/about/this/site">
			<About />
		</Route>
		<Route path="/Signup/new/user">
			<Signup />
		</Route>
	</Switch>
);

export default App;
