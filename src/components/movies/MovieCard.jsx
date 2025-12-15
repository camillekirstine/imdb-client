import React from "react";
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TMDB_IMAGE_BASE } from "../../config/apiConfig";
import { formatTitleType } from "../../utils/formatLabel";
import { getTitleTypeVariant } from "../../utils/titleTypeBadge";
import "./MovieCard.css";

const FALLBACK_SVG =
  "data:image/svg+xml;base64," +
  btoa(`
  <svg width="300" height="450" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="450" fill="#e0e0e0"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-size="20" fill="#888">No Image</text>
  </svg>
`);

function resolveRoute(item) {
  const id = item?.tconst ?? item?.id ?? item?.nconst;
  if (!id) return null;

  if (item?.nconst && !item?.tconst) return `/person/${id}`;

  const type = String(item?.titleType || "").toLowerCase();
  if (type === "movie") return `/movie/${id}`;
  if (type.includes("episode")) return `/episode/${id}`;
  if (type.includes("series")) return `/series/${id}`;

  return `/movie/${id}`;
}

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const route = resolveRoute(movie);
  const isClickable = Boolean(route);

  const friendlyTitle =
    movie?.primaryTitle ||
    movie?.movieTitle ||
    movie?.seriesTitle ||
    movie?.title ||
    movie?.name ||
    "Untitled";

  const posterPath =
    movie?.poster_path ||
    movie?.posterUrl ||
    movie?.banner ||
    null;

  let posterSrc = FALLBACK_SVG;
  if (posterPath) {
    posterSrc = String(posterPath).startsWith("/")
      ? `${TMDB_IMAGE_BASE}/w342${posterPath}`
      : posterPath;
  }

  const handleClick = () => {
    if (!route) return;
    navigate(route, { state: { from: { label: friendlyTitle } } });
  };

  return (
    <Card
      className="movie-card"
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? handleClick : undefined}
    >
      <div className="movie-card__poster-wrapper">
        <img
          src={posterSrc}
          alt={friendlyTitle}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_SVG;
          }}
          className="movie-card__poster"
        />

        {movie?.titleType && (
          <Badge
            bg={getTitleTypeVariant(movie.titleType)}
            className="movie-card__badge"
          >
            {formatTitleType(movie.titleType)}
          </Badge>
        )}
      </div>

      <Card.Body className="movie-card__body">
        <div className="movie-card__title">{friendlyTitle}</div>
      </Card.Body>
    </Card>
  );
}
