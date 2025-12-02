import { Navbar as BsNavbar, Container } from "react-bootstrap";

function Navbar({ pageName }) {
  return (
    <BsNavbar bg="dark" variant="dark" className="mb-4">
      <Container fluid className="px-5">
        <BsNavbar.Brand href="#home">
          <img
            src="/imdb.png"
            alt="IMDb Logo"
            height="40"
            className="d-inline-block align-top me-2"
          />
        </BsNavbar.Brand>
        <BsNavbar.Text className="text-white fs-4 fw-semibold">
          {pageName}
        </BsNavbar.Text>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
