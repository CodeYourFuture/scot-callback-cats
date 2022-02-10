import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container} from "react-bootstrap";


const NavbarComponent = () => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
		<Container>
		<Navbar.Brand href="#home">CYF | SMS Project</Navbar.Brand>
		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		<Navbar.Collapse id="responsive-navbar-nav">
		  <Nav className="me-auto">
			<Nav.Link href="/">Home</Nav.Link>
			<Nav.Link href="/calendar">Calendar</Nav.Link>
		  </Nav>
		</Navbar.Collapse>
		</Container>
	  </Navbar>
	);
};

export default NavbarComponent;
