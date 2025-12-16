import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { userService } from "../../api/userService";
import { isStrongPassword } from "../../utils/validators";


export default function ResetPasswordPanel() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
        setError("New passwords do not match");
        return;
      }
      
      if (!isStrongPassword(newPassword)) {
        setError(
          "Password must be at least 8 characters long, contain one uppercase letter and one number"
        );
        return;
    }
      

    setLoading(true);

    try {
      await userService.updatePassword({
        currentPassword,
        newPassword,
      });

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h5 className="mb-3">Reset password</h5>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Password updated successfully</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Current password</Form.Label>
          <Form.Control
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm new password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? "Updating…" : "Reset password"}
        </Button>
      </Form>
    </>
  );
}
