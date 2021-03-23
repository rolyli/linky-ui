import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
} from "react-bootstrap";

const NavbarEl = (props) => {
  return (
    <Navbar className="navbar" bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/">Linky</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Navbar.Text>
            <Link to="/about">About</Link>
          </Navbar.Text>
          <NavDropdown title="Topics" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/2.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/2.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/2.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/2.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>{" "}
        </Nav>{" "}
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { NavbarEl };
