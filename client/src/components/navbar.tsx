import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Routes and Link
import "../App.css"; // Import global CSS

const NavigationBar = ({ books }: Catalogue) => {
  return (
    <Navbar
      expand="lg"
      style={{ borderRadius: "30px", backgroundColor: "#007bff" }}
    >
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src="https://www.svgrepo.com/show/214412/cookbook-chef.svg"
            width="50px"
            alt="Logo"
            className="d-inline-block align-text-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            {/* Use Link component to handle navigation */}
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {books.map((book: Book) => (
            <Nav.Link as={Link} to={`/${book.category}`}>
                {book.category}
            </Nav.Link>
            ))}
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
