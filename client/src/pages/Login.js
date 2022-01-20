import logoBike from "./logoBike.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<form>
			<div className="Login-page">
				<div className="flex-container">
					<div className="img">
						<div className="container-image">
							<img src={logoBike} alt="bike logo" />
						</div>

						<h4>sign in</h4>
					</div>
					<div>
						<>
							<Form.Floating className="mb-3">
								<Form.Control
									id="floatingInputCustom"
									type="email"
									placeholder="name@example.com"
								/>
								<label htmlFor="floatingInputCustom">Email address</label>
							</Form.Floating>
							<Form.Floating>
								<Form.Control
									id="floatingPasswordCustom"
									type="password"
									placeholder="Password"
								/>
								<label htmlFor="floatingPasswordCustom">Password</label>
							</Form.Floating>
						</>
					</div>

					<div className="button">
						<button className="login-button" type="button">
							Log in
						</button>
					</div>

					<div className="signup">
						<p className="mb-0 me-2">
							you Don't have an account?
							<Link to="/Signup/new/user">Signup</Link>
						</p>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Login;
