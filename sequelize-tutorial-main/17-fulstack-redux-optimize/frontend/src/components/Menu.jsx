import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import secureLocalStorage from "react-secure-storage";
import NavDropdown from "react-bootstrap/NavDropdown";

function Menu() {
  const user = secureLocalStorage.getItem("user");
  let nama = "User";
  if (user) {
    nama = user.name;
  }
  const nav = () => {
    const auth = secureLocalStorage.getItem("acessToken");
    if (!auth) {
      return (
        <Container>
          <Navbar.Brand href="/">Contact APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      );
    } else {
      return (
        <Container>
          <Navbar.Brand href="/">Contact APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={nama} id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/profile">Profil</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      );
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      {nav()}
    </Navbar>
  );
}

export default Menu;
