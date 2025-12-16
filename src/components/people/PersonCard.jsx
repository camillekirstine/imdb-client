import React from "react";
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getPrimaryProfession } from "../../utils/formatLabel";
import SmartImage from "../common/SmartImage";

function normalize(value) {
  if (!value) return "";
  if (Array.isArray(value)) return value.join(", ");
  return String(value).replace(/[\[\]']+/g, "").trim();
}

export default function PersonCard({
  person,
  character,                 
  context = {},
  className = "",
  showJobBadge = false,
}) {
  const navigate = useNavigate();

  const id = person?.nconst ?? person?.id;
  const name = person?.primaryName ?? person?.name ?? "Unknown";

  const jobs = normalize(
    person?.allJobs ??
      person?.job ??
      person?.profession ??
      person?.primaryProfession
  );

  return (
    <Card
      className={`movie-card ${className}`}
      role={id ? "button" : undefined}
      onClick={
        id
          ? () =>
              navigate(`/person/${id}`, {
                state: { from: context.from },
              })
          : undefined
      }
    >
      <div className="movie-card__poster-wrapper">
        <SmartImage
          src={person?.profileUrl}
          tmdbPath={person?.profile_path}
          type="person"
          name={name}
          tmdbSize="w185"
          className="movie-card__poster"
        />

        {showJobBadge && jobs && (
          <Badge bg="dark" className="movie-card__badge">
            {getPrimaryProfession(jobs)}
          </Badge>
        )}
      </div>

      <Card.Body className="movie-card__body">
        <div className="movie-card__title">{name}</div>

        {/* Character / role */}
        {character && (
          <div
            className="text-muted"
            style={{
              fontSize: "0.8rem",
              lineHeight: 1.3,
            }}
          >
            as {character}
          </div>
        )}


        {!showJobBadge && jobs && (
          <div
            className="text-muted"
            style={{ fontSize: "0.75rem" }}
          >
            {jobs}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
