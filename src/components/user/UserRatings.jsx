import React from "react";
import useUserRatings from "../../hooks/useUserRatings";
import { Spinner, Alert, Card, Badge } from "react-bootstrap";
import MovieCard from "../movies/MovieCard";
import ProfilePanel from "../ProfilePanel";

export default function UserRatingsPanel() {
  const { items, loading, error } = useUserRatings();

  if (loading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <ProfilePanel title="Ratings">
      {!items.length && (
        <p className="text-muted">No ratings yet.</p>
      )}

      <div className="d-flex flex-wrap gap-3">
        {items.map((rating) => (
          <Card key={rating.ratingId} style={{ width: 220 }}>
            <MovieCard
              movie={{
                tconst: rating.tconst,
                primaryTitle: rating.title,
                titleType: rating.titleType,
                posterUrl: rating.posterUrl,
              }}
            />
            <Card.Body className="pt-2 text-center">
              <Badge bg="primary">
                My rating: {rating.rating} / 10
              </Badge>
            </Card.Body>
          </Card>
        ))}
      </div>
    </ProfilePanel>
  );
}
