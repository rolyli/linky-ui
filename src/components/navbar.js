import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import React from "react";

const NavbarEl = (props) => {
  return (
    <Navbar className="navbar" bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/">Linky</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>{" "}
        {props.user && (
          <Link to="/submit">
            <Button>Create Post</Button>
          </Link>
        )}
        {props.user ? (
          <NavDropdown title={props.user.username}>
            <NavDropdown.Item
              onClick={() => {
                props.setUser();
                localStorage.removeItem("user");
              }}
            >
              Sign out
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <div>
            <Link to="/login">
              <Button>Log in</Button>
            </Link>
            <Link to="/signup">
              <Button className="ml-2 btn-secondary">Sign up</Button>
            </Link>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export { NavbarEl };
