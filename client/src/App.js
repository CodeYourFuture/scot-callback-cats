import { Route, Switch } from "react-router-dom";
import UploadFile from "./pages/UploadFile";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => (
	<Switch>
		<Route path="/" exact>
			<Home />
		</Route>
		<Route path="/UploadFile/">
			<UploadFile />
		<Route path="/login">
			<Login />
		</Route>
	</Switch>
);

export default App;