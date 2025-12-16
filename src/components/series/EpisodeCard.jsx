import React from "react";
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SmartImage from "../common/SmartImage";

export default function EpisodeCard({ episode, context }) {
  const navigate = useNavigate();
  if (!episode) return null;

  return (
    <Card
      className="movie-card"
      role="button"
      onClick={() =>
        navigate(`/episode/${episode.tconst}`, {
          state: { from: context?.from },
        })
      }
    >
      <div className="movie-card__poster-wrapper">
        <SmartImage
          src={episode.posterUrl}
          type="title"
          name={episode.episodeTitle}
          tmdbSize="w342"
          className="movie-card__poster"
        />
      </div>

      <Card.Body className="movie-card__body">
        <Badge bg="secondary" className="mb-2">
          S{episode.seasonNumber} · E{episode.episodeNumber}
        </Badge>

        <div className="movie-card__title">
          {episode.episodeTitle}
        </div>
      </Card.Body>
    </Card>
  );
}
