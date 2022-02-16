import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";


const NavbarComponent = () => {


	return (
		<Navbar collapseOnSelect sticky="top" expand="sm" bg="dark" variant="dark">
		<Container>
		<Navbar.Brand as={Link} to="/">Bikes for Refugees SMS</Navbar.Brand>
		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		<Navbar.Collapse id="responsive-navbar-nav">
		  <Nav className="me-auto">
			<Nav.Link as={Link} to="/">Home</Nav.Link>
			<Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
			<Nav.Link as={Link} to="/messages">Messages</Nav.Link>
		  </Nav>
		</Navbar.Collapse>
		</Container>
	  </Navbar>
	);
};

export default NavbarComponent;
