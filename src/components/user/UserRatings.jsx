import React from "react";
import useUserRatings from "../../hooks/useUserRatings";
import { Spinner, Alert, Card, Badge } from "react-bootstrap";
import MovieCard from "../movies/MovieCard";
import ProfilePanel from "../ProfilePanel";

/*
  UserRatingsPanel
  - Displays ratings in a simple grid
  - Rating badge is visually secondary to the title
*/

export default function UserRatingsPanel() {
  const { items, loading, error } = useUserRatings();

  if (loading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <ProfilePanel title="Ratings">
      {!items.length && (
        <p className="text-muted">
          You have not rated any titles yet.
        </p>
      )}

      <div className="movie-grid">
        {items.map((rating) => (
          <Card key={rating.ratingId}>
            <MovieCard
              movie={{
                tconst: rating.tconst,
                primaryTitle: rating.title,
                titleType: rating.titleType,
                posterUrl: rating.posterUrl,
              }}
            />
            <Card.Body className="text-center">
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
