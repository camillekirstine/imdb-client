import { Card } from "react-bootstrap";

/*
  ProfilePanel
  - Shared wrapper for all user-related pages
  - Keeps spacing, headings, and surfaces consistent
*/

export default function ProfilePanel({ title, children }) {
  return (
    <Card className="mb-4">
      <Card.Body>
        {title && (
          <h4 className="mb-4">
            {title}
          </h4>
        )}
        {children}
      </Card.Body>
    </Card>
  );
}
