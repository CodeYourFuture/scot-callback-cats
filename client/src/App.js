import { Route, Switch } from "react-router-dom";
import UploadFile from "./pages/UploadFile";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => (
	<Switch>
		<Route path="/" exact>
			<Home />
		</Route>
		<Route path="/about/this/site">
			<About />
		</Route>
		<Route path="/UploadFile/">
			<UploadFile />
		</Route>
	</Switch>
);

export default App;
