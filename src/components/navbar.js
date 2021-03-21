import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const NavbarEl = () => {
  return (
    <Navbar className="navbar" bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/">Linky</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/about">About</Link>
          </Nav.Link>
          <NavDropdown title="Topics" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
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
