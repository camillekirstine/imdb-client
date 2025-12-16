import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_ORIGIN } from "../../config/apiConfig";

export default function AppNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?query=${encodeURIComponent(q)}`);
  };

  const goToProfile = () => navigate("/user");

  const handleLogout = () => {
    logout();
    navigate("/user/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>MovieApp</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/browse">
              <Nav.Link>Browse</Nav.Link>
            </LinkContainer>
          </Nav>

          {/* Search */}
          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search movies..."
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>

          {/* User avatar dropdown */}
          <Nav>
            {!isLoggedIn ? (
              <Nav.Link
                onClick={() => navigate("/user/login")}
                style={{ cursor: "pointer" }}
                aria-label="Log in"
              >
                <img
                  src={`${API_ORIGIN}/uploads/avatars/default.png`}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-circle"
                />
              </Nav.Link>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="user-dropdown"
                  className="d-flex align-items-center text-decoration-none p-0"
                >
                  <img
                    src={`${API_ORIGIN}${user.profileImageUrl}`}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="rounded-circle"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.src =
                        `${API_ORIGIN}/uploads/avatars/default.png`;
                    }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-animate">
                  <Dropdown.Header className="fw-semibold">
                    {user.username}
                  </Dropdown.Header>

                  <Dropdown.Item onClick={goToProfile}>
                    Profile
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item
                    className="text-danger"
                    onClick={handleLogout}
                  >
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
