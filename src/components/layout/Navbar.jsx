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
import { useTheme } from "../../context/ThemeContext";
import { API_ORIGIN } from "../../config/apiConfig";

export default function AppNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?query=${encodeURIComponent(q)}`);
  }

  function handleLogout() {
    logout();
    navigate("/user/login");
  }

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src="/assets/logo.png"
            alt="CIT02 Movie DB"
            className="navbar-logo"
          />
        </Navbar.Brand> 

        </LinkContainer>

        <Navbar.Toggle />

        <Navbar.Collapse>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>

          {/* Theme toggle */}
          <Button
            variant="outline-secondary"
            className="me-3"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </Button>

          {/* User menu */}
          <Nav>
            {!isLoggedIn ? (
              <Nav.Link onClick={() => navigate("/user/login")}>
                Log in
              </Nav.Link>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="p-0">
                  <img
                    src={`${API_ORIGIN}${user.profileImageUrl}`}
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-circle"
                    onError={(e) => {
                      e.currentTarget.src =
                        `${API_ORIGIN}/uploads/avatars/default.png`;
                    }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Header>{user.username}</Dropdown.Header>
                  <Dropdown.Item onClick={() => navigate("/user")}>
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
