import logoBike from "./logoBike.svg";
import Form from "react-bootstrap/Form";


const Login = () => {
	return (
		<form className="flex-container">
			<img src={logoBike} alt="bike logo" className="container-image" />

			<h1 className="fs-5">Sign in</h1>

			<Form.FloatingLabel controlId="email" label="Email address">
				<Form.Control type="email" placeholder="Email address" />

			</Form.FloatingLabel>
			<Form.Floating>
				<Form.Control
					id="floatingPasswordCustom"
					type="password"
					placeholder="Password"
				/>
				<label htmlFor="floatingPasswordCustom">Password</label>
			</Form.Floating>

			<div className="button">
				<button className="login-button" type="button">
					Log in
				</button>
			</div>

			<div className="signup">
				<p className="mb-0 me-2">
					you Don't have an account?
					<a href=""> signup </a>
				</p>
			</div>
		</form>
	);
};

export default Login;
