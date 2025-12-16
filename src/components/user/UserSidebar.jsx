import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_ORIGIN } from "../../config/apiConfig";

/*
  UserSidebar
  - Displays user identity and quick actions
*/

export default function UserSidebar({ profile }) {
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Body className="text-center">
        <img
          src={`${API_ORIGIN}${profile.profileImageUrl}`}
          alt="Profile"
          className="rounded-circle mb-3"
          style={{
            width: 120,
            height: 120,
            objectFit: "cover",
          }}
          onError={(e) => {
            e.currentTarget.src =
              `${API_ORIGIN}/uploads/avatars/default.png`;
          }}
        />

        <h5 className="mb-1">
          {profile.fullName || profile.username}
        </h5>

        <div className="text-muted mb-2">
          @{profile.username}
        </div>

        <div className="small text-muted mb-4">
          {profile.email}
        </div>

        <div className="d-grid gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => navigate("/user/profile")}
          >
            Edit profile
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => navigate("/user/password")}
          >
            Reset password
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
