import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../App.css"; // Import global CSS
import axios from "axios";

axios.defaults.withCredentials = true;

const NavigationBar = ({ books }: Catalogue) => {
  const navigate = useNavigate(); // useNavigate is used to programmatically navigate

  const handleCategoryClick = (category: string) => {
    // First navigate to the category page
    navigate(`/${category}`);
    // Then reload the page
    window.location.reload();
  };

  const handleLogout = async () => {
    try {
      // Make the logout request
      await axios.post("http://localhost:8080/user/logout", {});

      // On successful logout, navigate to the login page or home page
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };


  return (
    <Navbar
      expand="lg"
      style={{ borderRadius: "30px", backgroundColor: "#007bff" }}
    >
      <Container fluid>
        <Navbar.Brand href="/">
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
            <Nav.Link as={Link} to="/login" key={"login"}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/home" key={"home"}>
              Home
            </Nav.Link>
            {books.map((book: Book) => (
              <Nav.Link
                as={Link}
                to={`/${book.category}`}
                key={book.category}
                onClick={() => handleCategoryClick(book.category)} // Trigger reload on click
              >
                {book.category}
              </Nav.Link>
            ))}
            <Nav.Link as={Link} to="/about" key={"about"}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/" key={"logout"} onClick={() => handleLogout()}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
