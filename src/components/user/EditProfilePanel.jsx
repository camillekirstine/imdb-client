import { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { userService } from "../../api/userService";
import useUserProfile from "../../hooks/useUserProfile";
import { isValidEmail } from "../../utils/validators";

export default function EditProfilePanel() {
  const { profile } = useUserProfile();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Initialize values once profile is loaded
  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  // Generate preview when avatar changes
  useEffect(() => {
    if (!avatar) {
      setAvatarPreview(null);
      return;
    }

    const url = URL.createObjectURL(avatar);
    setAvatarPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [avatar]);

  const emailIsValid = isValidEmail(email);

  const hasChanges =
    fullName !== (profile?.fullName || "") ||
    email !== (profile?.email || "") ||
    avatar !== null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!emailIsValid) {
      setError("Please enter a valid email address");
      return;
    }

    if (!hasChanges) {
      setError("No changes to save");
      return;
    }

    setLoading(true);

    try {
      await userService.updateProfile({
        fullName,
        email,
        avatar,
      });

      setSuccess(true);
      setAvatar(null);

      // Optional: keep reload for now (safe)
      setTimeout(() => window.location.reload(), 600);
    } catch (err) {
      setError(err?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h5 className="mb-3">Edit profile</h5>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Profile updated successfully</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Display name */}
        <Form.Group className="mb-3">
          <Form.Label>Display name</Form.Label>
          <Form.Control
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your display name"
          />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            isInvalid={email.length > 0 && !emailIsValid}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address
          </Form.Control.Feedback>
        </Form.Group>

        {/* Avatar */}
        <Form.Group className="mb-3">
          <Form.Label>Profile image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </Form.Group>

        {/* Avatar preview */}
        {avatarPreview && (
          <div className="mb-3">
            <small className="text-muted d-block mb-1">Preview</small>
            <img
              src={avatarPreview}
              alt="Avatar preview"
              className="rounded-circle"
              style={{ width: 96, height: 96, objectFit: "cover" }}
            />
          </div>
        )}

        <Button type="submit" disabled={loading || !hasChanges}>
          {loading ? "Saving…" : "Save changes"}
        </Button>

        {!hasChanges && (
          <div className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
            No changes to save
          </div>
        )}
      </Form>
    </>
  );
}
