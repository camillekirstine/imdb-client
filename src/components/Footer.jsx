import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto py-3">
      <Container fluid className="text-center px-5">
        <p className="mb-0 text-muted">
          &copy; {new Date().getFullYear()} IMDb Clone. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
