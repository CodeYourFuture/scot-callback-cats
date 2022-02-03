import logoBike from "./logoBike.svg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
	return (
		<form className="flex-container">
			<img src={logoBike} alt="bike logo" className="container-image" />

			<h1 className="fs-5">Sign in</h1>

			<Form.FloatingLabel controlId="email" label="Email address">
				<Form.Control type="email" placeholder="Email address" />
			</Form.FloatingLabel>
			<Form.FloatingLabel controlId="password" label="password">
				<Form.Control type="password" placeholder="password" />
			</Form.FloatingLabel>

			<Button variant="primary">Sign in </Button>
		</form>
	);
};

export default Login;
