import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useUserProfile from "../../hooks/useUserProfile";
import { useAuth } from "../../context/AuthContext";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Spinner,
  Alert,
} from "react-bootstrap";
import UserSidebar from "./UserSidebar";

export default function UserProfile() {
  const { logout } = useAuth();
  const { profile, loading, error } = useUserProfile();
  const navigate = useNavigate();
  const location = useLocation();

  const currentRoute = location.pathname.split("/").pop();

  const labelMap = {
    bookmarks: "Bookmarks",
    ratings: "Ratings",
    history: "Search history",
    notes: "Notes",
    profile: "Edit profile",
    password: "Reset password",
  };

  function handleLogout() {
    logout();
    navigate("/user/login", { replace: true });
  }

  if (loading) return <Spinner className="m-4" />;
  if (error) return <Alert variant="danger">{String(error)}</Alert>;
  if (!profile) return null;

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-end">
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-secondary">
              {labelMap[currentRoute] || "Bookmarks"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/user/bookmarks")}>
                Bookmarks
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/user/ratings")}>
                Ratings
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/user/history")}>
                Search history
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/user/notes")}>
                Notes
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
        </Col>
      </Row>

      <Row>
        {/* LEFT SIDEBAR */}
        <Col md={4} lg={3} className="mb-4">
          <UserSidebar profile={profile} />
        </Col>

        {/* MAIN CONTENT */}
        <Col md={8} lg={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
