import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import {
  Film,
  Globe,
  CalendarEvent,
  Tags,
  Clock,
  PersonBadge,
} from "react-bootstrap-icons";
import { formatProfession } from "../../utils/formatLabel";

/*
  InfoCard
  - Used on detail pages (movie, series, episode, person)
*/

function iconForLabel(label = "") {
  const l = label.toLowerCase();

  if (l.includes("plot")) return Film;
  if (l.includes("genre")) return Tags;
  if (l.includes("language") || l.includes("country")) return Globe;
  if (l.includes("release") || l.includes("year") || l.includes("born"))
    return CalendarEvent;
  if (l.includes("runtime")) return Clock;
  if (l.includes("profession")) return PersonBadge;

  return Film;
}

function formatValue(label, value) {
  if (!value) return null;

  if (label.toLowerCase().includes("profession")) {
    return formatProfession(value);
  }

  return typeof value === "string" ? value : String(value);
}

export default function InfoCard({ title = "About", items = [] }) {
  if (!items.length) return null;

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h5 className="mb-3">{title}</h5>

        <ListGroup variant="flush">
          {items.map((item, idx) => {
            const value = formatValue(item.label, item.value);
            if (!value) return null;

            const Icon = iconForLabel(item.label);

            return (
              <ListGroup.Item
                key={idx}
                className="px-0 py-2"
                style={{
                  background: "transparent",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div className="d-flex gap-3 align-items-start">
                  <Icon
                    size={18}
                    style={{ marginTop: 3 }}
                  />

                  <div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.label}
                    </div>

                    <div
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
