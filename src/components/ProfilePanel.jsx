import { Card } from "react-bootstrap";

/**
 * Shared wrapper for all user panels.
 * Ensures consistent layout across the user dashboard.
 */
export default function ProfilePanel({ title, children }) {
  return (
    <Card className="mb-4">
      <Card.Body>
        {title && <h4 className="mb-3">{title}</h4>}
        {children}
      </Card.Body>
    </Card>
  );
}
