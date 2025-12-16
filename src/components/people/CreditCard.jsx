import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SmartImage from "../common/SmartImage";


export default function CreditCard({ credit }) {
  const navigate = useNavigate();
  if (!credit) return null;

  const id = credit.tconst ?? credit.id;
  if (!id) return null;

  const title =
    credit.primaryTitle ??
    credit.title ??
    credit.movieTitle ??
    credit.seriesTitle ??
    "Untitled";

  const poster =
    credit.posterUrl ??
    credit.poster ??
    null;

  const type = String(credit.titleType ?? "").toLowerCase();
  const path =
    type.includes("episode")
      ? `/episode/${id}`
      : type.includes("series")
      ? `/series/${id}`
      : `/movie/${id}`;

  return (
    <Card
      className="movie-card"
      role="button"
      onClick={() =>
        navigate(path, {
          state: { from: { label: title, path } },
        })
      }
    >
      <div className="movie-card__poster-wrapper">
        <SmartImage
          src={poster}
          type="title"
          name={title}
          tmdbSize="w342"
          className="movie-card__poster"
        />
      </div>

      <Card.Body className="movie-card__body">
        <div className="movie-card__title">
          {title}
        </div>
      </Card.Body>
    </Card>
  );
}
