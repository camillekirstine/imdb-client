import React from "react";
import { Row, Col, Card } from "react-bootstrap";

/*
  DetailLayout
  - Shared layout for movie, series, episode, and person pages
*/

export default function DetailLayout({
  breadcrumbs,
  title,
  poster,
  aboutCard,
  children,
  footerContent,
}) {
  return (
    <>
      {breadcrumbs && (
        <div className="mb-3">
          {breadcrumbs}
        </div>
      )}

      {title && (
        <div className="mb-4">
          <h1 className="mb-0">{title}</h1>
        </div>
      )}

      {/* Poster + About */}
      <Row className="g-4 mb-5">
        <Col xs={12} md={4}>
          {poster}
        </Col>

        <Col xs={12} md={8}>
          {aboutCard}
        </Col>
      </Row>

      {/* Main content (episodes, notes, etc.) */}
      {children && (
        <Card className="mb-5 shadow-sm">
          <Card.Body>
            {children}
          </Card.Body>
        </Card>
      )}

      {/* Footer sections (cast, credits, photos) */}
      {footerContent && (
        <div className="mt-5">
          {footerContent}
        </div>
      )}
    </>
  );
}
